import { animations, actionTypes } from './constants'

const reducerValidation = (action: CharacterAction) => {
  const { payload, type } = action

  const isAnimation = (arg: any): arg is AnimationsValues => {
    return arg === animations.downToUp || arg === animations.upToDown
  }
  const isDisplay = (arg: any): arg is Display => {
    return arg === 'none' || arg === 'grid'
  }
  const isNullableTimeout = (arg: any): arg is NodeJS.Timeout | null => {
    return arg === null || typeof arg === 'number'
  }

  if (type === actionTypes.changeAnimation && !isAnimation(payload))
    throw new Error(
      `CharacterPayload does not match the type. Expected payload to be "down-to-up 1s forwards" or "up-to-down 1s forwards", but received ${payload}`
    )

  if (type === actionTypes.changeDisplay && !isDisplay(payload))
    throw new Error(
      `CharacterPayload does not match the type. Expected payload to be "none" or "grid", but received ${payload}`
    )

  if (type === actionTypes.changeTimeout && !isNullableTimeout(payload))
    throw new Error(
      `CharacterPayload does not match the type. Expected to be "null" or "number", but received ${payload}`
    )
}

export { animations, actionTypes, reducerValidation }
