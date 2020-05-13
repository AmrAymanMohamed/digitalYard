import teachersTypes from '../Types/teachersTypes';

const INITIAL_STATE = {
  fetching: false,
  success: false,
  failure: false
};
/** destructing action parameter */
const submitTeachers = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case teachersTypes.TEACHERS_SUBMIT_REQUEST:
      return {
        ...state,
        fetching: true,
        failure: false,
        success: false,
        payload
      };
    case teachersTypes.TEACHERS_SUBMIT_SUCCESS:
      return {
        ...state,
        fetching: false,
        failure: false,
        success: true
      };
    case teachersTypes.TEACHERS_SUBMIT_FAILURE:
      return {
        ...state,
        fetching: false,
        failure: true,
        success: false
      };
    default:
      return state;
  }
};

export default submitTeachers;
