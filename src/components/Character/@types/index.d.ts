type AnimationsKeys = keyof typeof import('../utils').animations
type AnimationsValues = typeof import('../utils').animations[AnimationsKeys]
type Display = 'none' | 'grid'

interface CharacterState {
  display: Display
  animation: AnimationsValues
  t: NodeJS.Timeout | null
  favorite: boolean
}

type CharacterActionTypesKeys = keyof typeof import('../utils').actionTypes
type CharacterActionTypesValues =
  typeof import('../utils').actionTypes[CharacterActionTypesKeys]
type CharacterPayload =
  | AnimationsValues
  | Display
  | NodeJS.Timeout
  | null
  | boolean

interface CharacterAction {
  payload: CharacterPayload
  type: CharacterActionTypesValues
}
