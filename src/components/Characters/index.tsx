import { useEffect, useReducer } from 'react'

import Character from 'components/Character'
import { actionTypes, reducerValidation } from './utils'
import './index.css'

const initialState: CharactersState = {
  info: null,
  characters: [],
  favorites: []
}

const reducer = (state: CharactersState, action: CharactersAction) => {
  reducerValidation(action)

  const { payload, type } = action

  switch (type) {
    case actionTypes.setCharactersAndInfo: {
      return {
        ...state,
        characters: (payload as CharactersAndInfo).characters,
        info: (payload as CharactersAndInfo).info    
      }
    }
    case actionTypes.addToFavorites: {
      const ids = state.favorites.map(f => f.id)

      if (ids.includes((payload as RickAndMortyCharacter).id))
        return state

      return {
        ...state,
        favorites: state.favorites.concat(payload as RickAndMortyCharacter)
      }
    }
    default: {
      return state
    }
  }
}

const Characters = () => {
  const [{ characters, favorites }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(({ info, results }: RickAndMortyApiCharacterResponse) => {
        dispatch({
          type: actionTypes.setCharactersAndInfo,
          payload: {
            characters: results,
            info
          }
        })
      })
  }, [])

  const handleClick = (character: RickAndMortyCharacter): void => {
    dispatch({
      type: actionTypes.addToFavorites,
      payload: character
    })
  }

  return (
    <>
      {favorites.length > 0 && (
        <>
          <h3>Favorites:</h3>
          <section className='Characters'>
            {favorites.map(character => (
              <Character
                key={character.id}
                character={character}
                onClick={handleClick}
              />
            ))}
          </section>
        </>
      )}
      <h3>Rick n' Morty characters:</h3>
      <section className='Characters'>
        {characters.map(character => (
          <Character
            key={character.id}
            character={character}
            onClick={handleClick}
          />
        ))}
      </section>
    </>
  )
}

export default Characters
