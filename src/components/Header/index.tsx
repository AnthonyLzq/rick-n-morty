import { useContext } from 'react'

import DarkModeContext from 'context/darkModeContext'

import './index.css'

const Header = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext)

  const handleClick = () => {
    if (setDarkMode) setDarkMode(!darkMode)
  }

  return (
    <header className='Header'>
      <h2
        style={{
          color: darkMode ? '#b2b2b2' : '#222'
        }}
      >
        ReactHooks
      </h2>
      <button
        type='button'
        onClick={handleClick}
        style={{
          border: 0,
          backgroundColor: darkMode ? '#222' : '#b2b2b2'
        }}
      >
        {darkMode ? (
          <img
            src='https://img.icons8.com/ios/48/b2b2b2/sun--v1.png'
            alt='go to light mode'
          />
        ) : (
          <img
            src='https://img.icons8.com/ios-filled/48/000000/do-not-disturb-2.png'
            alt='go to dark mode'
          />
        )}
      </button>
    </header>
  )
}

export default Header
