import { createContext } from 'react'

interface DarkModeContextProps {
  darkMode: boolean
  setDarkMode: ((darkMode: boolean) => void) | null
}

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  setDarkMode: null
})

export default DarkModeContext
