const animations = {
  downToUp: 'down-to-up 1.5s forwards',
  upToDown: 'up-to-down 1.5s forwards'
} as const

const actionTypes = {
  changeAnimation: 'CHANGE_ANIMATION',
  changeDisplay: 'CHANGE_DISPLAY',
  changeTimeout: 'CHANGE_TIMEOUT',
  setFavorite: 'SET_FAVORITE'
} as const

export { animations, actionTypes }
