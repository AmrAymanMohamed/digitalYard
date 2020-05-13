import NotificationTypes from '../Types/notificationTypes';

const notificationRequest = (type, data) => ({
  type: NotificationTypes.NOTIFICATION_REQUEST,
  payload: {type, data}
});

const notificationSuccess = (type, data) => ({
  type: NotificationTypes.NOTIFICATION_SUCCESS,
  payload: {type, data}
});

const notificationFailure = () => ({
  type: NotificationTypes.NOTIFICATION_FAILURE,
});

const notificaitonActions = {
    notificationRequest,
    notificationSuccess,
    notificationFailure,
};

export default notificaitonActions;
