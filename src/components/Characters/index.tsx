import { useState, useEffect } from 'react'

import Character from 'components/Character'
import './index.css'

const Characters = () => {
  const [characters, setCharacters] = useState<RickAndMortyCharacter[]>([])
  const [, setInfo] = useState<RickAndMortyApiCharacterResponseInfo | null>(
    null
  )

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(({ info: i, results }: RickAndMortyApiCharacterResponse) => {
        setCharacters(results)
        setInfo(i)
      })
  }, [])

  return (
    <section className='Characters'>
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </section>
  )
}

export default Characters
