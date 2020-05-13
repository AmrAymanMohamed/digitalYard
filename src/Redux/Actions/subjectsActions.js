import SubjectsTypes from '../Types/subjectsTypes';

const subjectsRequest = () => ({
  type: SubjectsTypes.SUBJECTS_REQUEST,
});

const subjectsSuccess = payload => ({
  type: SubjectsTypes.SUBJECTS_SUCCESS,
  payload
});

const subjectsFailure = () => ({
  type: SubjectsTypes.SUBJECTS_FAILURE,
});

const subjectsActions = {
    subjectsRequest,
    subjectsSuccess,
    subjectsFailure,
};

export default subjectsActions;
