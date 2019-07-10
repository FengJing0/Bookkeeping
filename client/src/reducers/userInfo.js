import { GET,SET } from '../constants/userInfo'

const INITIAL_STATE = {
  avatarUrl: "",
  city: "",
  country: "",
  gender: 0,
  language: "",
  nickName: "",
  province: "",
  _id: "",
  count: 0,
  createTime:0
}

export default function userInfo (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        ...action.data
      }
    case SET:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}