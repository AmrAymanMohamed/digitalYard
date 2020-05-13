import {call, put} from 'redux-saga/effects';
import SubjectsActions from '../Redux/Actions/subjectsActions';

export default function* getSubjects(teachersServices, {payload}) {
    const Result = yield call(teachersServices.getSubjects);
    if (!Result.ok) {
        yield put(SubjectsActions.subjectsFailure());
      } else {
          if(Result.data.responseCode === 200){
            let data = Result.data.responseData;
            yield put(SubjectsActions.subjectsSuccess(data));
          }else{
            yield put(SubjectsActions.subjectsFailure());
          }
      }
}
