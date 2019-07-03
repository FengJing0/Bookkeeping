import { combineReducers } from 'redux'
import systemInfo from './systemInfo'
import category from './category'

export default combineReducers({
  systemInfo,
  category
})