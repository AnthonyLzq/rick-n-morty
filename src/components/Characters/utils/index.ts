import { actionTypes } from './constants'

const reducerValidation = (action: CharactersAction) => {
  const { payload, type } = action

  console.log(payload)

  const isCharactersAndInfo = (arg: any): arg is CharactersAndInfo => {
    return (
      arg &&
      arg.characters &&
      Array.isArray(arg.characters) &&
      typeof arg.characters[0].id &&
      typeof arg.characters[0].id === 'number' &&
      arg.info &&
      arg.info.count &&
      typeof arg.info.count === 'number'
    )
  }
  const isRickAndMortyCharacter = (arg: any): arg is RickAndMortyCharacter => {
    return arg && typeof arg.id === 'number'
  }

  if (
    type === actionTypes.setCharactersAndInfo &&
    !isCharactersAndInfo(payload)
  )
    throw new Error(
      `CharactersPayload does not match the type. Expected payload to be "CharactersAndInfo", but received ${payload}`
    )

  if (type === actionTypes.addToFavorites && !isRickAndMortyCharacter(payload))
    throw new Error(
      `CharactersPayload does not match the type. Expected payload to be "RickAndMortyCharacter", but received ${payload}`
    )
}

export { actionTypes, reducerValidation }
