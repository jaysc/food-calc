import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ItemWithConfirmed {
  value: number;
  itemOrder: number;
}

interface Person {
  name: string;
  items: ItemWithConfirmed[];
  earliestConfirmedItemIndex: number | null;
  showItems: boolean;
  index: number;
}

interface PersonStore {
  persons: Record<string, Person>;
  globalNumber: number | null;
  isNumberConfirmed: boolean;
  latestItemOrder: number;
  latestItemOrderCounter: number; // Keeps track if the item has been added or not to a person.
  addPerson: () => void;
  removePerson: (id: string) => void;
  setName: (id: string, name: string) => void;
  setGlobalNumber: (number: number | null) => void;
  confirmNumber: () => void;
  resetNumber: () => void;
  addItem: (personId: string, value: number) => void;
  removeLastConfirmedItem: (personId: string) => void;
  removeItemAtIndex: (personId: string, index: number) => void;
  getItemsTotal: (personId: string) => number;
  toggleShowItems: (personId: string) => void;
  setLatestItemOrder: (order: number) => void;
}

export const usePersonStore = create<PersonStore>()(
  persist(
    (set, get) => ({
      persons: {},
      latestItemOrder: 1,
      latestItemOrderCounter: 0,
      globalNumber: null,
      isNumberConfirmed: false,

      addPerson: () =>
        set((state) => {
          const id = crypto.randomUUID();

          return {
            persons: {
              ...state.persons,
              [id]: {
                name: '',
                items: [],
                earliestConfirmedItemIndex: null,
                showItems: false,
                index: Object.keys(state.persons).length + 1,
              },
            },
          };
        }),

      removePerson: (id) =>
        set((state) => {
          const newPersons = { ...state.persons };
          delete newPersons[id];
          return { persons: newPersons };
        }),

      setName: (id, name) =>
        set((state) => ({
          persons: {
            ...state.persons,
            [id]: { ...state.persons[id], name },
          },
        })),

      setGlobalNumber: (number) => set({ globalNumber: number }),

      confirmNumber: () => set({ isNumberConfirmed: true }),

      resetNumber: () =>
        set((state) => {
          // Reset all persons' earliestConfirmedItemIndex
          const updatedPersons = Object.fromEntries(
            Object.entries(state.persons).map(([id, person]) => [
              id,
              {
                ...person,
                earliestConfirmedItemIndex: null,
              },
            ])
          );

          state.latestItemOrderCounter = 0;

          return {
            globalNumber: null,
            isNumberConfirmed: false,
            persons: updatedPersons,
          };
        }),

      addItem: (personId, value) =>
        set((state) => {
          const person = state.persons[personId];
          if (!person) return state;

          let itemOrder = state.latestItemOrder;
          if (state.latestItemOrderCounter === 0) {
            itemOrder = state.latestItemOrder + 1;
            state.latestItemOrder = itemOrder;
          }

          state.latestItemOrderCounter++;

          const newItems = [...person.items, { value, itemOrder: itemOrder }];
          return {
            persons: {
              ...state.persons,
              [personId]: {
                ...person,
                items: newItems,
                earliestConfirmedItemIndex:
                  person.earliestConfirmedItemIndex === null
                    ? newItems.length - 1
                    : person.earliestConfirmedItemIndex,
              },
            },
          };
        }),

      removeLastConfirmedItem: (personId) =>
        set((state) => {
          const person = state.persons[personId];
          if (!person || person.earliestConfirmedItemIndex === null) return state;

          const newItems = [...person.items];
          newItems.splice(newItems.length - 1, 1);

          state.latestItemOrderCounter--;

          if (state.latestItemOrderCounter === 0) {
            state.latestItemOrder--;
          }

          return {
            persons: {
              ...state.persons,
              [personId]: {
                ...person,
                items: newItems,
                earliestConfirmedItemIndex:
                  person.earliestConfirmedItemIndex === newItems.length
                    ? null
                    : person.earliestConfirmedItemIndex,
              },
            },
          };
        }),

      removeItemAtIndex: (personId, index) =>
        set((state) => {
          const person = state.persons[personId];
          if (!person) return state;

          const newItems = [...person.items];
          newItems.splice(index, 1);

          return {
            persons: {
              ...state.persons,
              [personId]: {
                ...person,
                items: newItems,
                earliestConfirmedItemIndex:
                  person.earliestConfirmedItemIndex === index
                    ? null
                    : person.earliestConfirmedItemIndex,
              },
            },
          };
        }),

      getItemsTotal: (personId) => {
        const state = get();
        const person = state.persons[personId];
        if (!person || !person.items) return 0;
        return person.items.reduce((sum, item) => sum + item.value, 0);
      },

      toggleShowItems: (personId) =>
        set((state) => ({
          persons: {
            ...state.persons,
            [personId]: {
              ...state.persons[personId],
              showItems: !state.persons[personId].showItems,
            },
          },
        })),

      setLatestItemOrder: (order) =>
        set(() => ({
          latestItemOrder: Math.max(1, order),
        })),
    }),
    {
      name: 'food-calc-storage',
      partialize: (state) => ({
        persons: Object.fromEntries(
          Object.entries(state.persons).map(([id, person]) => [
            id,
            {
              ...person,
              showItems: false,
            },
          ])
        ),
      }),
    }
  )
);
