import {call, put} from 'redux-saga/effects';
import LoginAction from '../Redux/Actions/loginActions';
import api from '../Services/Api';
import NotificationActions from '../Redux/Actions/notificationActions';
export default function* login(loginServices, {payload}) {
  const {username, password} = payload;
  if (username === null || password === null) {
    yield put(LoginAction.loginFailure());
    yield put(NotificationActions.notificationRequest("error",["Username / Password Cannot Be Empty"]));
    return;
  }
  const loginResult = yield call(loginServices.login, payload);
  if (!loginResult.ok) {
    yield put(LoginAction.loginFailure());
  } else {
    const {data} = loginResult;
    if(data.responseCode === 200){
        // console.log(data.responseData);
        localStorage.setItem('Authorization', 'Bearer '+ data.responseData.accessToken);
        api.api.setHeader('Authorization', localStorage.getItem("Authorization"))
        localStorage.setItem('userName', data.responseData.name);
        localStorage.setItem('userRoles', data.responseData.roles);
        yield put(LoginAction.loginSuccess());
    } else{
       yield put(NotificationActions.notificationRequest("error",[data.responseMessage]));
       yield put(LoginAction.loginFailure());
    }
    
  }
}
