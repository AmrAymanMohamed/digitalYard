import {call, put} from 'redux-saga/effects';
import TeachersActions from '../Redux/Actions/teachersActions';
import NotificationActions from '../Redux/Actions/notificationActions';
export default function* submitTeachers(teachersServices, {payload}) {
    const {image, firstName, middleName, lastName, email, phone, TeacherSubjectsList} = payload;
        let errors = 0;
        let errorArray = []
        if(image == null){
            errors += 1;
            errorArray.push("Image Is Mandatory");
        }
        if(firstName == null){
            errors += 1;
            errorArray.push("First Name Is Mandatory");
        }
        if(middleName == null){
            errors += 1;
            errorArray.push("Middle Name Is Mandatory");
        }
        if(lastName == null){
            errors += 1;
            errorArray.push("Last Name Is Mandatory");
        }
        if(phone == null){
            errors += 1;
            errorArray.push("Phone Is Mandatory");
        }
        if(firstName != null && (firstName.length < 2 || firstName.length > 20)){
            errors += 1;
            errorArray.push("First Name Must Be Between 2 And 20 Characters");
        }

        if(middleName != null && (middleName.length < 2 || middleName.length > 20)){
            errors += 1;
            errorArray.push("Middle Name Must Be Between 2 And 20 Characters");
        }

        if(lastName != null && (lastName.length < 2 || lastName.length > 20)){
            errors += 1;
            errorArray.push("Last Name Must Be Between 2 And 20 Characters");
        }

        if(email != null && (email.length < 10 || email.length > 50)){
            errors += 1;
            errorArray.push("Email Must Be Between 10 And 50 Characters");
        }

        if(phone != null && (phone.replace("+20_", "").length < 8 || phone.replace("+20_", "").length > 11)){
            errors += 1;
            errorArray.push("Phone Must Be Between 8 And 11 Characters");
        }
        if(phone != null && !phone.includes("+20_")){
            errors += 1;
            errorArray.push("Phone Must Start With +20_");
        }
        if(TeacherSubjectsList.length === 0){
            errors += 1;
            errorArray.push("Select At Least 1 Class");
        } else {
            for(let i = 0 ; i < TeacherSubjectsList.length ; i +=1){
                const teacherSubject = TeacherSubjectsList[i];
                if(teacherSubject["isMainSubject"] === true && teacherSubject["classRoomIDs"].length === 0){
                    errors += 1;
                    errorArray.push("Select At Least 1 Class for Subjects With 'Is Main Subject' Flag Checked");
                break;
                }
            }
        }
        if(errors > 0){
            yield put(NotificationActions.notificationRequest("error",errorArray));
            yield put(TeachersActions.teachersSubmitFailure());
            return;
        }
    const Result = yield call(teachersServices.submitTeachers, payload);
    
    if (!Result.ok) {
        yield put(TeachersActions.teachersSubmitFailure());
        if(Result.status === 400){
            yield put(NotificationActions.notificationRequest("error",[...Result.data.errors.DelegationTeacherID]));
        }
      } else {
          if(Result.data.responseCode === 200){
            let data = Result.data.responseData;
            yield put(TeachersActions.teachersSubmitSuccess(data.teacherID));
            yield put(NotificationActions.notificationRequest("success",["Inserted Successfuly"]));  
        }else{
            yield put(TeachersActions.teachersSubmitFailure());
            yield put(NotificationActions.notificationRequest("error",[Result.data.responseMessage]));
            return
          }
      }
}
