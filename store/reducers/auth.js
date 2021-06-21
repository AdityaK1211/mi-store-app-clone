import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  displayName: null,
  phoneNumber: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        displayName: action.displayName,
        phoneNumber: action.phoneNumber,
      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
