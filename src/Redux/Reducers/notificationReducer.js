import notificationTypes from '../Types/notificationTypes';

const INITIAL_STATE = {
  visable: false,
  type: null,
  data:[]
};
/** destructing action parameter */
const notify = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case notificationTypes.NOTIFICATION_REQUEST:
      return {
        ...state,
        visable: false,
        type: null,
        data: payload
      };
    case notificationTypes.NOTIFICATION_SUCCESS:
      return {
        ...state,
        visable: true,
        type: payload.type,
        data: payload.data
      };
    case notificationTypes.NOTIFICATION_FAILURE:
      return {
        ...state,
        visable: false,
        type: null,
        data: []
      };
    default:
      return state;
  }
};

export default notify;
