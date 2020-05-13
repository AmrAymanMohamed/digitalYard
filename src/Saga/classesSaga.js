import {call, put} from 'redux-saga/effects';
import ClassesActions from '../Redux/Actions/classesActions';

export default function* getClasses(classesServices, {payload}) {
    const Result = yield call(classesServices.getClasses,payload);
    if (!Result.ok) {
        yield put(ClassesActions.classesFailure());
      } else {
          if(Result.data.responseCode === 200){
            let data = Result.data.responseData;
            const {subjectId} = payload
            yield put(ClassesActions.classesSuccess({subjectId,data}));
          }else{
            yield put(ClassesActions.classesFailure());
          }
      }
}
