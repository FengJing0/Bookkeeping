import {
  GET,
  SET
} from '../constants/userInfo'

export const get = data => {
  return {
    type: GET,
    data
  }
}

export const set = data => {
  return {
    type: SET,
    data
  }
}
// export const minus = () => {
//   return {
//     type: MINUS
//   }
// }

// 异步的 action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(get())
    }, 2000)
  }
}