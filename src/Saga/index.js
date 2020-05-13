import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import loginTypes from '../Redux/Types/loginTypes';
import subjectsTypes from '../Redux/Types/subjectsTypes';
import classesTypes from '../Redux/Types/classesTypes';
import teachersTypes from '../Redux/Types/teachersTypes';
import notificationTypes from '../Redux/Types/notificationTypes';

import loginSaga from './loginSaga';
import subjectsSaga from './subjectsSaga';
import classesSaga from './classesSaga'
import teachersSaga from './teachersSaga'
import notificationSaga from './notificationSaga'

import LoginServices from '../Services/loginServices';
import SubjectsServices from '../Services/subjectsServices';
import ClassesServices from '../Services/classesServices';
import TeachersServices from '../Services/teachersServices';

const loginServices = LoginServices.create();
const subjectsServices = SubjectsServices.create();
const classesServices = ClassesServices.create();
const teachersServices = TeachersServices.create();

export default function* root() {
  yield all([
    takeLatest(loginTypes.LOGIN_REQUEST, loginSaga, loginServices),
    takeLatest(subjectsTypes.SUBJECTS_REQUEST, subjectsSaga, subjectsServices),
    takeEvery(classesTypes.CLASSES_REQUEST, classesSaga, classesServices),
    takeLatest(teachersTypes.TEACHERS_SUBMIT_REQUEST, teachersSaga, teachersServices),
    takeLatest(notificationTypes.NOTIFICATION_REQUEST, notificationSaga),  
]);
}
