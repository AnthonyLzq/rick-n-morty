import { useState } from 'react'

import Header from './components/Header'
import Characters from './components/Characters'
import DarkModeContext from './context/darkModeContext'
import { COLORS } from './utils'

import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  document.body.style.backgroundColor = darkMode ? COLORS.black : COLORS.white

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <main
        className='App'
        style={{
          backgroundColor: darkMode ? COLORS.black : COLORS.white,
          color: darkMode ? COLORS.white : COLORS.black
        }}
      >
        <Header />
        <Characters />
      </main>
    </DarkModeContext.Provider>
  )
}

export default App
