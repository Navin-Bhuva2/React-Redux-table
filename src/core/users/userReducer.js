import userActions from "./userActions";
const initState = { userActions: {} };
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case userActions.FAKE_ACTION:
      return {
        userActions: action
      };
    case userActions.GET_ALL_USERS_SUCCESS:
      return {
        userActions: action
      };
    case userActions.GET_ALL_USERS_ERROR:
      return {
        userActions: action
      };

    default:
      return state;
  }
}