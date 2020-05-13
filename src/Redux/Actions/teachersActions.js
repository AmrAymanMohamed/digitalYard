import TeachersTypes from '../Types/teachersTypes';

const teachersSubmitRequest = (image, firstName, middleName, lastName, email, phone, delegationTeacher,TeacherSubjectsList) => ({
  type: TeachersTypes.TEACHERS_SUBMIT_REQUEST,
  payload: {image, firstName, middleName, lastName, email, phone, delegationTeacher,TeacherSubjectsList}
});

const teachersSubmitSuccess = () => ({
  type: TeachersTypes.TEACHERS_SUBMIT_SUCCESS
});

const teachersSubmitFailure = () => ({
  type: TeachersTypes.TEACHERS_SUBMIT_FAILURE,
});

const teachersActions = {
    teachersSubmitRequest,
    teachersSubmitSuccess,
    teachersSubmitFailure,
};

export default teachersActions;
