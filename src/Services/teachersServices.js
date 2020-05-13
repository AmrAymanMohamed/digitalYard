import api from './Api';

const create = () => {
  const submitTeachers = action => {
    const {image, firstName, middleName, lastName, email, phone, delegationTeacher,TeacherSubjectsList} = action  

    let formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('MiddleName', middleName);
    formData.append('LastName', lastName);
    formData.append('Email', email);
    formData.append('Phone', phone);
    formData.append('Image', image);
    if(delegationTeacher != null && delegationTeacher !== ""){
        formData.append('delegationTeacherID', delegationTeacher);
    }

    for(let i = 0 ; i < TeacherSubjectsList.length ; i+=1){
        formData.append(`TeacherSubjectsList[${i}]["subjectID"]`, TeacherSubjectsList[i]["subjectID"]);
        formData.append(`TeacherSubjectsList[${i}]["isMainSubject"]`, TeacherSubjectsList[i]["isMainSubject"]);
        for(let j = 0 ; j < TeacherSubjectsList[i]["classRoomIDs"].length ; j+=1){
            formData.append(`TeacherSubjectsList[${i}]["classRoomIDs"][${j}]`, TeacherSubjectsList[i]["classRoomIDs"][j]);
        }
    }

    api.api.setHeader('Authorization', localStorage.getItem("Authorization"))
    api.api.setHeader('content-type', 'multipart/form-data')
    
    return api.api.post('/Teachers/InsertTeacher',formData);
  };
  return {submitTeachers};
};

export default {create};