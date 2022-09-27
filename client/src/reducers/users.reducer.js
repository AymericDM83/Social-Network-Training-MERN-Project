import { GET_USERS } from "../actions/users.actions";

const initialState = {};

export default function usersReducers(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
