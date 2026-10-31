import { useSyncExternalStore } from 'react'

function createStore(key: string) {
  const listeners = new Set<() => void>()
  let value: string[] = []
  try {
    value = JSON.parse(localStorage.getItem(key) ?? '[]')
  } catch {
    value = []
  }

  return {
    get: () => value,
    add(id: string) {
      if (value.includes(id)) return
      value = [...value, id]
      localStorage.setItem(key, JSON.stringify(value))
      listeners.forEach((l) => l())
    },
    subscribe(l: () => void) {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

export const caughtStore = createStore('pokedex-caught')
export const badgeStore = createStore('pokedex-badges')

export function useStore(store: ReturnType<typeof createStore>) {
  return useSyncExternalStore(store.subscribe, store.get)
}
