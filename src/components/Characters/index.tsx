import { useEffect, useReducer, useMemo, ChangeEvent, useContext } from 'react'

import Character from 'components/Character'
import DarkModeContext from 'context/darkModeContext'
import { actionTypes, reducerValidation } from './utils'
import { COLORS } from 'utils'

import './index.css'

const initialState: CharactersState = {
  info: null,
  characters: [],
  favorites: [],
  search: ''
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

      if (ids.includes((payload as RickAndMortyCharacter).id)) return state

      return {
        ...state,
        favorites: state.favorites.concat(payload as RickAndMortyCharacter)
      }
    }
    case actionTypes.search: {
      return {
        ...state,
        search: payload as string
      }
    }
    default: {
      return state
    }
  }
}

const Characters = () => {
  const { darkMode } = useContext(DarkModeContext)
  const [{ characters, favorites, search }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const filteredCharacters = useMemo(
    () =>
      characters.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
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

  const handleSearch = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actionTypes.search,
      payload: value
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
      <nav className='search-container'>
        <div className='search'>
          <input
            type='text'
            id='search'
            className='input'
            value={search}
            onChange={e => handleSearch(e)}
            placeholder=' '
            style={{
              color: darkMode ? COLORS.white : COLORS.black,
              borderColor: darkMode ? COLORS.white : COLORS.black
            }}
          />
          <label
            htmlFor='search'
            className='label'
            style={{
              backgroundColor: darkMode ? COLORS.black : COLORS.white,
              color: darkMode ? COLORS.white : COLORS.black
            }}
          >
            Search for a character
          </label>
        </div>
      </nav>
      <h3>Rick n' Morty characters:</h3>
      <section className='Characters'>
        {filteredCharacters.map(character => (
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
