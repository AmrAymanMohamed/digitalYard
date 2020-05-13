import {delay, put} from 'redux-saga/effects';
import NotificationActions from '../Redux/Actions/notificationActions';

export default function* getSubjects({payload}) {
    const {type, data} = payload
    /**notify Up */
    yield put(NotificationActions.notificationSuccess(type, data));
    yield delay(5000);
    /*notify down*/
    yield put(NotificationActions.notificationFailure());
}
