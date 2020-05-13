import loginTypes from '../Types/loginTypes';

const INITIAL_STATE = {
  fetching: false,
  success: false,
  failure: false,
};
/** destructing action parameter */
const login = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case loginTypes.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        failure: false,
        success: false,
      };
    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        failure: false,
        success: true,
      };
    case loginTypes.LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
        failure: true,
        success: false,
      };
    default:
      return state;
  }
};

export default login;
