import { combineReducers } from 'redux'
import systemInfo from './systemInfo'
import category from './category'
import userInfo from './userInfo'

export default combineReducers({
  systemInfo,
  category,
  userInfo
})