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
  addToGlobalNumber: (value: number) => void;
  confirmNumber: () => void;
  resetNumber: () => void;
  addItem: (personId: string) => void;
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
      latestItemOrder: 0,
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

      setGlobalNumber: (number) =>
        set(() => ({
          globalNumber: number,
        })),

      addToGlobalNumber: (value) =>
        set((state) => ({
          globalNumber: (state.globalNumber ?? 0) + value,
        })),

      confirmNumber: () =>
        set((state) => ({ isNumberConfirmed: true, latestItemOrder: state.latestItemOrder + 1 })),

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

          const updatedLatestItemOrder =
            state.latestItemOrderCounter === 0 ? state.latestItemOrder - 1 : state.latestItemOrder;

          return {
            globalNumber: null,
            isNumberConfirmed: false,
            persons: updatedPersons,
            latestItemOrder: updatedLatestItemOrder,
            latestItemOrderCounter: 0,
          };
        }),

      addItem: (personId) =>
        set((state) => {
          const person = state.persons[personId];
          if (!person || state.globalNumber == null) return state;

          state.latestItemOrderCounter++;

          const newItems = [
            ...person.items,
            { value: state.globalNumber, itemOrder: state.latestItemOrder },
          ];
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
