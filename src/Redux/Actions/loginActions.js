import LoginTypes from '../Types/loginTypes';

const loginRequest = (username, password) => ({
  type: LoginTypes.LOGIN_REQUEST,
  payload: {username, password},
});

const loginSuccess = () => ({
  type: LoginTypes.LOGIN_SUCCESS,
});

const loginFailure = () => ({
  type: LoginTypes.LOGIN_FAILURE,
});

const loginActions = {
  loginRequest,
  loginSuccess,
  loginFailure,
};

export default loginActions;
