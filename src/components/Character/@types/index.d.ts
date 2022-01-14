type AnimationsKeys = keyof typeof import('../utils').animations
type AnimationsValues = typeof import('../utils').animations[AnimationsKeys]
type Display = 'none' | 'grid'

interface State {
  display: Display
  animation: AnimationsValues
  t: NodeJS.Timeout | null
}

type ActionTypesKeys = keyof typeof import('../utils').actionTypes
type ActionTypesValues = typeof import('../utils').actionTypes[ActionTypesKeys]
type Payload = AnimationsValues | Display | NodeJS.Timeout | null

interface Action {
  payload: Payload
  type: ActionTypesValues
}
