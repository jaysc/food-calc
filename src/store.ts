import { create } from 'zustand'

interface NumberWithConfirmed {
  value: number
  confirmedNumber: number
}

interface Person {
  name: string
  numbers: NumberWithConfirmed[]
  earliestConfirmedNumberIndex: number | null
  showNumbers: boolean
}

interface PersonStore {
  persons: Record<string, Person>
  globalNumber: number | null
  isNumberConfirmed: boolean
  addPerson: (id: string, name: string) => void
  removePerson: (id: string) => void
  setName: (id: string, name: string) => void
  setGlobalNumber: (number: number | null) => void
  confirmNumber: () => void
  resetNumber: () => void
  addNumber: (personId: string, confirmedNumber: number) => void
  removeLastConfirmedNumber: (personId: string) => void
  removeNumberAtIndex: (personId: string, index: number) => void
  getNumbersTotal: (personId: string) => number
  toggleShowNumbers: (personId: string) => void
}

export const usePersonStore = create<PersonStore>((set, get) => ({
  persons: {},
  globalNumber: null,
  isNumberConfirmed: false,

  addPerson: (id, name) => set((state) => ({
    persons: {
      ...state.persons,
      [id]: { name, numbers: [], earliestConfirmedNumberIndex: null, showNumbers: false }
    }
  })),

  removePerson: (id) => set((state) => {
    const newPersons = { ...state.persons }
    delete newPersons[id]
    return { persons: newPersons }
  }),

  setName: (id, name) => set((state) => ({
    persons: {
      ...state.persons,
      [id]: { ...state.persons[id], name }
    }
  })),

  setGlobalNumber: (number) => set({ globalNumber: number }),

  confirmNumber: () => set({ isNumberConfirmed: true }),

  resetNumber: () => set((state) => {
    // Reset all persons' earliestConfirmedNumberIndex
    const updatedPersons = Object.fromEntries(
      Object.entries(state.persons).map(([id, person]) => [
        id,
        {
          ...person,
          earliestConfirmedNumberIndex: null
        }
      ])
    );

    return {
      globalNumber: null,
      isNumberConfirmed: false,
      persons: updatedPersons
    };
  }),

  addNumber: (personId, confirmedNumber) => set((state) => {
    const person = state.persons[personId]
    if (!person) return state

    const newNumbers = [...person.numbers, { value: confirmedNumber, confirmedNumber }]
    return {
      persons: {
        ...state.persons,
        [personId]: {
          ...person,
          numbers: newNumbers,
          earliestConfirmedNumberIndex: person.earliestConfirmedNumberIndex === null ? newNumbers.length - 1 : person.earliestConfirmedNumberIndex
        }
      }
    }
  }),

  removeLastConfirmedNumber: (personId) => set((state) => {
    const person = state.persons[personId]
    if (!person || person.earliestConfirmedNumberIndex === null) return state

    const newNumbers = [...person.numbers]
    newNumbers.splice(newNumbers.length - 1, 1)
    
    return {
      persons: {
        ...state.persons,
        [personId]: {
          ...person,
          numbers: newNumbers,
          earliestConfirmedNumberIndex: person.earliestConfirmedNumberIndex === newNumbers.length ? null : person.earliestConfirmedNumberIndex
        }
      }
    }
  }),

  removeNumberAtIndex: (personId, index) => set((state) => {
    const person = state.persons[personId]
    if (!person) return state

    const newNumbers = [...person.numbers]
    newNumbers.splice(index, 1)

    return {
      persons: {
        ...state.persons,
        [personId]: {
          ...person,
          numbers: newNumbers,
          earliestConfirmedNumberIndex: person.earliestConfirmedNumberIndex === index ? null : person.earliestConfirmedNumberIndex
        }
      }
    }
  }),

  getNumbersTotal: (personId) => {
    const state = get()
    const person = state.persons[personId]
    if (!person) return 0
    return person.numbers.reduce((sum, num) => sum + num.value, 0)
  },

  toggleShowNumbers: (personId) => set((state) => ({
    persons: {
      ...state.persons,
      [personId]: {
        ...state.persons[personId],
        showNumbers: !state.persons[personId].showNumbers
      }
    }
  }))
})) 