interface CharactersState {
  info: RickAndMortyApiCharacterResponseInfo | null
  characters: RickAndMortyCharacter[]
  favorites: RickAndMortyCharacter[]
}

type CharactersActionTypesKeys = keyof typeof import('../utils').actionTypes
type CharactersActionTypesValues =
  typeof import('../utils').actionTypes[CharactersActionTypesKeys]
type CharactersAndInfo = {
  characters: RickAndMortyCharacter[]
  info: RickAndMortyApiCharacterResponseInfo
}
type CharactersPayload =
  | CharactersAndInfo
  | RickAndMortyCharacter

interface CharactersAction {
  payload: CharactersPayload
  type: CharactersActionTypesValues
}
