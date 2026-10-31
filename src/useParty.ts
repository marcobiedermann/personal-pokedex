import { BADGES, getParty } from './data'
import { useHalloween } from './halloween'
import { badgeStore, caughtStore, useStore } from './store'

export function useParty() {
  return getParty(useHalloween(), useStore(caughtStore))
}

export function useBadges() {
  const unlocked = useStore(badgeStore)
  return BADGES.map((b) => ({ ...b, earned: b.earned || unlocked.includes(b.name) }))
}
