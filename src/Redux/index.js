import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Saga from '../Saga';
import {
  loginReducer,
  teachersReducers,
  subjectsReducers,
  classesReducers,
  notificationReducers
} from './Reducers';
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
  login: loginReducer,
  teachers: teachersReducers,
  subjects: subjectsReducers,
  classes: classesReducers,
  notifications: notificationReducers
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Saga);

export default store;
