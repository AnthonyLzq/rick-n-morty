import { useState } from 'react'

import Header from './components/Header'
import Characters from './components/Characters'
import DarkModeContext from './context/darkModeContext'

import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  document.body.style.backgroundColor = darkMode ? '#222' : '#b2b2b2'

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <main
        className='App'
        style={{
          backgroundColor: darkMode ? '#222' : '#b2b2b2',
          color: darkMode ? '#b2b2b2' : '#222'
        }}
      >
        <Header />
        <Characters />
      </main>
    </DarkModeContext.Provider>
  )
}

export default App
