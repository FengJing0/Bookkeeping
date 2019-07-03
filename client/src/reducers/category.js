import { GET } from '../constants/category'

const INITIAL_STATE = []

export default function category (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET:
      return action.data
    default:
      return state
  }
}