import { FC, useContext, useEffect, useReducer } from 'react'

import DarkModeContext from 'context/darkModeContext'
import { animations, actionTypes, reducerValidation } from './utils'
import { COLORS } from 'utils'

import './index.css'

interface CharacterProps {
  character: RickAndMortyCharacter
  onClick: (character: RickAndMortyCharacter, favorite: boolean) => void
  wasFavorite: boolean
}

const initialState: CharacterState = {
  display: 'none',
  animation: animations.downToUp,
  t: null,
  favorite: false
}

const reducerObject = (
  state: CharacterState,
  payload: CharacterPayload
): Record<CharacterActionTypesValues, CharacterState> => ({
  [actionTypes.changeAnimation]: {
    ...state,
    animation: payload as AnimationsValues
  },
  [actionTypes.changeDisplay]: {
    ...state,
    display: payload as Display
  },
  [actionTypes.changeTimeout]: {
    ...state,
    t: payload as NodeJS.Timeout | null
  },
  [actionTypes.setFavorite]: {
    ...state,
    favorite: payload as boolean
  }
})

const reducer = (
  state: CharacterState,
  action: CharacterAction
): CharacterState => {
  reducerValidation(action)

  const { payload, type } = action

  return reducerObject(state, payload)[type]
}

const Character: FC<CharacterProps> = props => {
  const { character, onClick: onClickCharacter, wasFavorite } = props
  const { name, image, status, gender, species, origin, location } = character
  const { darkMode } = useContext(DarkModeContext)
  const backgroundColor = darkMode ? COLORS.white : COLORS.black
  const color = darkMode ? COLORS.black : COLORS.white
  const [{ animation, display, t, favorite }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    if (t)
      return () => {
        clearTimeout(t)
      }
  }, [t])

  const onMouseEnter = () => {
    if (t) {
      clearTimeout(t)
      dispatch({ type: actionTypes.changeTimeout, payload: null })
    }

    if (animation === animations.upToDown)
      dispatch({
        type: actionTypes.changeAnimation,
        payload: animations.downToUp
      })

    dispatch({ type: actionTypes.changeDisplay, payload: 'grid' })
  }

  const onMouseLeave = () => {
    // setTimeout(() => {
    //   setAnimation(animations.upToDown)
    // }, 500)
    dispatch({
      type: actionTypes.changeAnimation,
      payload: animations.upToDown
    })
    dispatch({
      type: actionTypes.changeTimeout,
      payload: setTimeout(() => {
        if (display === 'grid')
          dispatch({ type: actionTypes.changeDisplay, payload: 'none' })

        dispatch({
          type: actionTypes.changeAnimation,
          payload: animations.downToUp
        })
      }, 1500)
    })
  }

  const onClick = () => {
    onClickCharacter(character, !(favorite || wasFavorite))
    dispatch({
      type: actionTypes.setFavorite,
      payload: !(favorite || wasFavorite)
    })
  }

  return (
    <article
      className='Character'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <img src={image} alt={name} />
      <div className='name-and-favorite'>
        <h3>{name}</h3>
        {(favorite || wasFavorite) && (
          <img
            src={`https://img.icons8.com/material-rounded/24/${
              darkMode ? COLORS.white.slice(1) : COLORS.black.slice(1)
            }/like--v1.png`}
            alt='favorite'
          />
        )}
      </div>
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
