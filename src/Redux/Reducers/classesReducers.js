import classesTypes from '../Types/classesTypes';

const INITIAL_STATE = {
  fetching: false,
  success: false,
  failure: false,
  data:[]
};
/** destructing action parameter */
const classes = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case classesTypes.CLASSES_REQUEST:
      return {
        ...state,
        fetching: true,
        failure: false,
        success: false,
      };
    case classesTypes.CLASSES_SUCCESS:
       const {data} = state; 
      return {
        ...state,
        fetching: false,
        failure: false,
        success: true,
        data: [...data, payload]
      };
    case classesTypes.CLASSES_FAILURE:
      return {
        ...state,
        fetching: false,
        failure: true,
        success: false,
      };
    default:
      return state;
  }
};

export default classes;
