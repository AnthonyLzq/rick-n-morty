import { FC, useContext, useEffect, useState } from 'react'

import DarkModeContext from '../../context/darkModeContext'
import Loader from '../Loader'
import './index.css'

const ERROR_IMAGE =
  'https://static.wikia.nocookie.net/memes-pedia/images/7/74/This_Is_Fine.png/revision/latest/top-crop/width/360/height/450?cb=20170101154622&path-prefix=es'

interface CharacterProps {
  character: RickAndMortyCharacter
}

const animations = {
  downToUp: 'down-to-up 1s forwards',
  upToDown: 'up-to-down 1s forwards'
}

const Character: FC<CharacterProps> = props => {
  const {
    character: { name, url, status, gender, species, origin, location }
  } = props
  const { darkMode } = useContext(DarkModeContext)
  const backgroundColor = darkMode ? '#b2b2b2' : '#222'
  const color = darkMode ? '#222' : '#b2b2b2'
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(false)
  const [display, setDisplay] = useState('none')
  const [animation, setAnimation] = useState(animations.downToUp)
  const [t, setT] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          setImage(result.image)
          setLoading(false)
        })
        .catch(_ => {
          setError(true)
          setLoading(false)
        })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [url])

  const onMouseEnter = () => {
    if (t) {
      clearTimeout(t)
      setT(null)
    }

    if (animation === animations.upToDown)
      setAnimation(animations.downToUp)

    if (!loading && !error) setDisplay('grid')
  }

  const onMouseLeave = () => {
    // setTimeout(() => {
    //   setAnimation(animations.upToDown)
    // }, 500)
    setAnimation(animations.upToDown)
    setT(
      setTimeout(() => {
        if (display === 'grid') setDisplay('none')

        setAnimation(animations.downToUp)
      }, 1500)
    )
  }

  return (
    <article
      className='Character'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <img src={ERROR_IMAGE} alt='error' />
      ) : (
        <img src={image} alt={name} />
      )}
      <h3>{name}</h3>
      <footer
        style={{
          display,
          animation,
          backgroundColor,
          color
        }}
      >
        <ul>
          <li>Status: {status}</li>
          <li>Species: {species}</li>
          <li>Gender: {gender}</li>
          <li>Origin: {origin.name}</li>
          <li>Location: {location.name}</li>
        </ul>
      </footer>
    </article>
  )
}

export default Character
