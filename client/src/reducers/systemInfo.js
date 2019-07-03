import { GET } from '../constants/systemInfo'

const INITIAL_STATE = {
  statusBarHeight: 0
}

export default function systemInfo (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET:
      return {
        statusBarHeight: action.data
      }
    default:
      return state
  }
}