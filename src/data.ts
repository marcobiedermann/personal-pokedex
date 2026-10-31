import pikachuImg from './assets/pokemon/25.png'
import pikachuCry1 from './assets/cries/pikachu-1.mp3'
import pikachuCry2 from './assets/cries/pikachu-2.mp3'
import pikachuCry3 from './assets/cries/pikachu-3.mp3'
import pikachuCry4 from './assets/cries/pikachu-4.mp3'
import thunderboltSound from './assets/cries/donnerblitz.mp3'
import evoliCry from './assets/cries/evee.mp3'
import mimikyuImg from './assets/pokemon/778.png'
import umbreonImg from './assets/pokemon/197.png'
import gastlyImg from './assets/pokemon/92.png'
import haunterImg from './assets/pokemon/93.png'
import gengarImg from './assets/pokemon/94.png'
import pumpkabooImg from './assets/pokemon/710.png'
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
    cries: [evoliCry],
    color: '#c8a060',
  },
]

const HALLOWEEN_FORMS: Record<string, Partial<Pokemon>> = {
  pikachu: {
    number: 778,
    name: 'Mimigma',
    species: 'Verkleidungs-Pokémon',
    types: ['Geist', 'Fee'],
    base: { kp: 55, angriff: 90, verteidigung: 80, spAngriff: 50, spVerteidigung: 105, initiative: 96 },
    moves: [
      { name: 'Kratzer', type: 'Normal' },
      { name: 'Erstauner', type: 'Geist' },
      { name: 'Schattenstoß', type: 'Geist' },
      { name: 'Dunkelklaue', type: 'Geist' },
    ],
    height: '0,2 m',
    weight: '0,7 kg',
    description:
      'Es versteckt sich unter einem Pikachu-Lumpen, weil es Freunde finden will. Wer einen Blick darunter wirft, wird verflucht.',
    image: mimikyuImg,
    color: '#7e57c2',
  },
  evoli: {
    number: 197,
    name: 'Nachtara',
    species: 'Mondschein-Pokémon',
    types: ['Unlicht'],
    base: { kp: 95, angriff: 65, verteidigung: 110, spAngriff: 60, spVerteidigung: 130, initiative: 65 },
    moves: [
      { name: 'Biss', type: 'Unlicht' },
      { name: 'Finte', type: 'Unlicht' },
      { name: 'Konfusstrahl', type: 'Geist' },
      { name: 'Verfolgung', type: 'Unlicht' },
    ],
    height: '1,0 m',
    weight: '27,0 kg',
    description:
      'In mondhellen Nächten beginnen die Ringe auf seinem Fell zu leuchten. Es lauert im Dunkeln und überrascht seine Gegner.',
    image: umbreonImg,
    color: '#4a4a7a',
  },
}

function wild(p: Omit<Pokemon, 'nickname' | 'cries'>): Pokemon {
  return { ...p, nickname: p.name, cries: [] }
}

export const WILD_POKEMON: Pokemon[] = [
  wild({
    id: 'nebulak',
    number: 92,
    name: 'Nebulak',
    species: 'Gas-Pokémon',
    level: 12,
    types: ['Geist', 'Gift'],
    base: { kp: 30, angriff: 35, verteidigung: 30, spAngriff: 100, spVerteidigung: 35, initiative: 80 },
    moves: [
      { name: 'Schlecker', type: 'Geist' },
      { name: 'Konfusstrahl', type: 'Geist' },
      { name: 'Hypnose', type: 'Psycho' },
      { name: 'Nachtnebel', type: 'Geist' },
    ],
    height: '1,3 m',
    weight: '0,1 kg',
    description: 'Fast sein ganzer Körper besteht aus Gas. Es schleicht sich nachts an und hüllt seine Opfer in Nebel.',
    image: gastlyImg,
    color: '#7e57c2',
  }),
  wild({
    id: 'alpollo',
    number: 93,
    name: 'Alpollo',
    species: 'Gas-Pokémon',
    level: 25,
    types: ['Geist', 'Gift'],
    base: { kp: 45, angriff: 50, verteidigung: 45, spAngriff: 115, spVerteidigung: 55, initiative: 95 },
    moves: [
      { name: 'Schlecker', type: 'Geist' },
      { name: 'Hypnose', type: 'Psycho' },
      { name: 'Nachtnebel', type: 'Geist' },
      { name: 'Traumfresser', type: 'Psycho' },
    ],
    height: '1,6 m',
    weight: '0,1 kg',
    description: 'Es schwebt durch die Dunkelheit und streckt seine Hände nach Passanten aus, um sie zu erschrecken.',
    image: haunterImg,
    color: '#5e35b1',
  }),
  wild({
    id: 'gengar',
    number: 94,
    name: 'Gengar',
    species: 'Schatten-Pokémon',
    level: 38,
    types: ['Geist', 'Gift'],
    base: { kp: 60, angriff: 65, verteidigung: 60, spAngriff: 130, spVerteidigung: 75, initiative: 110 },
    moves: [
      { name: 'Spukball', type: 'Geist' },
      { name: 'Nachtnebel', type: 'Geist' },
      { name: 'Hypnose', type: 'Psycho' },
      { name: 'Traumfresser', type: 'Psycho' },
    ],
    height: '1,5 m',
    weight: '40,5 kg',
    description: 'Es versteckt sich im Schatten und grinst breit. Wenn es lacht, wird es im Raum plötzlich eiskalt.',
    image: gengarImg,
    color: '#6a1b9a',
  }),
  wild({
    id: 'irrbis',
    number: 710,
    name: 'Irrbis',
    species: 'Kürbis-Pokémon',
    level: 20,
    types: ['Geist', 'Pflanze'],
    base: { kp: 49, angriff: 66, verteidigung: 70, spAngriff: 44, spVerteidigung: 55, initiative: 51 },
    moves: [
      { name: 'Erstauner', type: 'Geist' },
      { name: 'Spukball', type: 'Geist' },
      { name: 'Rankenhieb', type: 'Pflanze' },
      { name: 'Fluch', type: 'Geist' },
    ],
    height: '0,4 m',
    weight: '5,0 kg',
    description: 'Seelen, die in einem Kürbis wohnen, leuchten nachts und locken Kinder in die Dunkelheit.',
    image: pumpkabooImg,
    color: '#ff7a00',
  }),
]

export function getParty(halloween: boolean, caught: string[] = []): Pokemon[] {
  const wildCaught = caught.flatMap((id) => WILD_POKEMON.filter((w) => w.id === id))
  return [...POKEMON, ...wildCaught].map((p) => (halloween ? { ...p, ...HALLOWEEN_FORMS[p.id] } : p))
}

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

export function pickWild(caught: string[], preferred?: string | null): Pokemon | null {
  const free = WILD_POKEMON.filter((w) => !caught.includes(w.id))
  if (free.length === 0) return null
  const wanted = free.find((w) => w.id === preferred)
  return wanted ?? free[Math.floor(Math.random() * free.length)]
}
