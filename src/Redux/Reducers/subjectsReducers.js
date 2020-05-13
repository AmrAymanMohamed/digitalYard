import subjectsTypes from '../Types/subjectsTypes';

const INITIAL_STATE = {
  fetching: false,
  success: false,
  failure: false,
  data:[]
};
/** destructing action parameter */
const getSubjects = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case subjectsTypes.SUBJECTS_REQUEST:
      return {
        ...state,
        fetching: true,
        failure: false,
        success: false,
        data: payload
      };
    case subjectsTypes.SUBJECTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        failure: false,
        success: true,
        data: payload
      };
    case subjectsTypes.SUBJECTS_FAILURE:
      return {
        ...state,
        fetching: false,
        failure: true,
        success: false,
        data: payload
      };
    default:
      return state;
  }
};

export default getSubjects;
