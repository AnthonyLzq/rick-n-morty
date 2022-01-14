const animations = {
  downToUp: 'down-to-up 1s forwards',
  upToDown: 'up-to-down 1s forwards'
} as const

const actionTypes = {
  changeAnimation: 'CHANGE_ANIMATION',
  changeDisplay: 'CHANGE_DISPLAY',
  changeTimeout: 'CHANGE_TIMEOUT'
} as const

export { animations, actionTypes }
