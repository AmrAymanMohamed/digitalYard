import ClassesTypes from '../Types/classesTypes';

const classesRequest = (subjectId) => ({
  type: ClassesTypes.CLASSES_REQUEST,
  payload: {subjectId},
});

const classesSuccess = payload => ({
  type: ClassesTypes.CLASSES_SUCCESS,
  payload
});

const classesFailure = () => ({
  type: ClassesTypes.CLASSES_FAILURE,
});

const classesActions = {
    classesRequest,
    classesSuccess,
    classesFailure,
};

export default classesActions;
