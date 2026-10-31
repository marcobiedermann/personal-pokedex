import { createContext, useContext } from 'react'

export const HalloweenContext = createContext(false)

export const useHalloween = () => useContext(HalloweenContext)
