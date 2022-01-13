import { useState } from 'react'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleClick = () => setDarkMode(!darkMode)

  return (
    <header className='Header'>
      <h2>ReactHooks</h2>
      <button type='button' onClick={handleClick}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}

export default Header
