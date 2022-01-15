import { useEffect, useReducer, useMemo, useContext, useRef } from 'react'

import Character from 'components/Character'
import DarkModeContext from 'context/darkModeContext'
import { useFetch } from 'hooks'
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

      const favorites = state.favorites.concat(payload as RickAndMortyCharacter)
      localStorage.setItem(
        'favorites',
        JSON.stringify([...new Set(favorites.map(({ id }) => id))])
      )

      return {
        ...state,
        favorites
      }
    }
    case actionTypes.removeFromFavorites: {
      const favorites = state.favorites.filter(
        f => f.id !== (payload as RickAndMortyCharacter).id
      )
      localStorage.setItem(
        'favorites',
        JSON.stringify([...new Set(favorites.map(({ id }) => id))])
      )

      return {
        ...state,
        favorites
      }
    }
    case actionTypes.setFavorites: {
      return {
        ...state,
        favorites: payload as RickAndMortyCharacter[]
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

const getFavoritesFromLocalStorage = (): number[] => {
  const savedFavoriteIds = localStorage.getItem('favorites')

  return savedFavoriteIds ? JSON.parse(savedFavoriteIds) : []
}

const Characters = () => {
  const { darkMode } = useContext(DarkModeContext)
  const { response } = useFetch<RickAndMortyApiCharacterResponse>({
    url: 'https://rickandmortyapi.com/api/character'
  })
  const [{ characters, favorites, search }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const favoriteIds = favorites.map(({ id }) => id)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (characters.length > 0) {
      const favIds = getFavoritesFromLocalStorage()
      dispatch({
        type: actionTypes.setFavorites,
        payload: characters.filter(({ id }) => favIds.includes(id))
      })
    }
  }, [characters])

  useEffect(() => {
    if (response) {
      const { info, results } = response
      dispatch({
        type: actionTypes.setCharactersAndInfo,
        payload: {
          characters: results,
          info
        }
      })
    }
  }, [response])

  const filteredCharacters = useMemo(
    () =>
      characters.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  )

  const handleClick = (
    character: RickAndMortyCharacter,
    favorite: boolean
  ): void => {
    dispatch({
      type: favorite
        ? actionTypes.addToFavorites
        : actionTypes.removeFromFavorites,
      payload: character
    })
  }

  const handleSearch = () => {
    if (searchRef.current)
      dispatch({
        type: actionTypes.search,
        payload: searchRef.current.value
      })
  }

  return (
    <>
      <nav className='search-container'>
        <div className='search'>
          <input
            type='text'
            id='search'
            className='input'
            value={search}
            ref={searchRef}
            onChange={handleSearch}
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
        {filteredCharacters.map(character => {
          const wasFavorite = favoriteIds.includes(character.id)

          return (
            <Character
              key={character.id}
              character={character}
              onClick={handleClick}
              wasFavorite={wasFavorite}
            />
          )
        })}
      </section>
    </>
  )
}

export default Characters
