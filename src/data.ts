import pikachuImg from './assets/pokemon/25.png'
import pikachuCry1 from './assets/cries/pikachu-1.mp3'
import pikachuCry2 from './assets/cries/pikachu-2.mp3'
import pikachuCry3 from './assets/cries/pikachu-3.mp3'
import pikachuCry4 from './assets/cries/pikachu-4.mp3'
import thunderboltSound from './assets/cries/donnerblitz.mp3'
import evoliImg from './assets/pokemon/133.png'

export type StatKey = 'kp' | 'angriff' | 'verteidigung' | 'spAngriff' | 'spVerteidigung' | 'initiative'

export const STAT_LABELS: Record<StatKey, string> = {
  kp: 'KP',
  angriff: 'Angriff',
  verteidigung: 'Verteidigung',
  spAngriff: 'Sp.-Angriff',
  spVerteidigung: 'Sp.-Vert.',
  initiative: 'Initiative',
}

export const STAT_ORDER: StatKey[] = ['kp', 'angriff', 'verteidigung', 'spAngriff', 'spVerteidigung', 'initiative']

export interface Move {
  name: string
  type: string
  sound?: string
}

export interface Pokemon {
  id: string
  number: number
  name: string
  nickname: string
  species: string
  level: number
  types: string[]
  base: Record<StatKey, number>
  moves: Move[]
  height: string
  weight: string
  description: string
  image: string
  cries: string[]
  color: string
}

export const TRAINER = 'Ash Ketchum'

export const TRAINER_INFO = [
  { label: 'Name', value: 'Marco' },
  { label: 'Alter', value: '32' },
  { label: 'Wohnort', value: 'Berlin' },
]

export const POKEMON: Pokemon[] = [
  {
    id: 'pikachu',
    number: 25,
    name: 'Pikachu',
    nickname: 'Rosa',
    species: 'Maus-Pokémon',
    level: 6,
    types: ['Elektro'],
    base: { kp: 35, angriff: 55, verteidigung: 40, spAngriff: 50, spVerteidigung: 50, initiative: 90 },
    moves: [
      { name: 'Donnerschock', type: 'Elektro' },
      { name: 'Donnerblitz', type: 'Elektro', sound: thunderboltSound },
      { name: 'Heuler', type: 'Normal' },
      { name: 'Rutenschlag', type: 'Normal' },
    ],
    height: '0,4 m',
    weight: '6,0 kg',
    description:
      'In seinen Wangen speichert es Elektrizität. Wenn es wütend ist, entlädt es die Energie in einem kräftigen Stromstoß.',
    image: pikachuImg,
    cries: [pikachuCry1, pikachuCry2, pikachuCry3, pikachuCry4],
    color: '#f8d030',
  },
  {
    id: 'evoli',
    number: 133,
    name: 'Evoli',
    nickname: 'Katja',
    species: 'Evolutions-Pokémon',
    level: 31,
    types: ['Normal'],
    base: { kp: 55, angriff: 55, verteidigung: 50, spAngriff: 45, spVerteidigung: 65, initiative: 55 },
    moves: [
      { name: 'Tackle', type: 'Normal' },
      { name: 'Sandwirbel', type: 'Boden' },
      { name: 'Ruckzuckhieb', type: 'Normal' },
      { name: 'Biss', type: 'Unlicht' },
    ],
    height: '0,3 m',
    weight: '6,5 kg',
    description:
      'Sein unstabiler Körperbau kann sich je nach Umgebung verändern. Dadurch kann es sich zu vielen verschiedenen Formen entwickeln.',
    image: evoliImg,
    cries: [],
    color: '#c8a060',
  },
]

export const PARTY_SIZE = 6

const IV = 31

export function calcStat(key: StatKey, base: number, level: number): number {
  const core = Math.floor(((2 * base + IV) * level) / 100)
  return key === 'kp' ? core + level + 10 : core + 5
}

export function calcStats(p: Pokemon): Record<StatKey, number> {
  return Object.fromEntries(
    STAT_ORDER.map((k) => [k, calcStat(k, p.base[k], p.level)]),
  ) as Record<StatKey, number>
}

export interface Badge {
  name: string
  leader: string
  symbol: string
  color: string
  earned: boolean
}

export const BADGES: Badge[] = [
  { name: 'Felsorden', leader: 'Rocko', symbol: '⬢', color: '#a1887f', earned: true },
  { name: 'Quellorden', leader: 'Misty', symbol: '💧', color: '#4fc3f7', earned: true },
  { name: 'Donnerorden', leader: 'Major Bob', symbol: '⚡', color: '#ffd54f', earned: true },
  { name: 'Regenbogenorden', leader: 'Erika', symbol: '✿', color: '#81c784', earned: false },
  { name: 'Seelenorden', leader: 'Koga', symbol: '♥', color: '#f06292', earned: false },
  { name: 'Sumpforden', leader: 'Sabrina', symbol: '◉', color: '#ba68c8', earned: false },
  { name: 'Vulkanorden', leader: 'Pyro', symbol: '🔥', color: '#ff8a65', earned: false },
  { name: 'Erdorden', leader: 'Giovanni', symbol: '◆', color: '#8d6e63', earned: false },
]
