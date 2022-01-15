import { FC, useContext, useReducer } from 'react'

import DarkModeContext from 'context/darkModeContext'
import { animations, actionTypes, reducerValidation } from './utils'
import './index.css'

interface CharacterProps {
  character: RickAndMortyCharacter
}

const initialState: CharacterState = {
  display: 'none',
  animation: animations.downToUp,
  t: null
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
  const {
    character: { name, image, status, gender, species, origin, location }
  } = props
  const { darkMode } = useContext(DarkModeContext)
  const backgroundColor = darkMode ? '#b2b2b2' : '#222'
  const color = darkMode ? '#222' : '#b2b2b2'
  const [{ animation, display, t }, dispatch] = useReducer(
    reducer,
    initialState
  )

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

  return (
    <article
      className='Character'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={image} alt={name} />
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
