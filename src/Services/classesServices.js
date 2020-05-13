import api from './Api';

const create = () => {
  const getClasses = action => {
    const {subjectId} = action
    api.api.setHeader('Authorization', localStorage.getItem("Authorization"))
    return api.api.get(`/ClassRoom/GetAssignedClassRooms?SubjectID=${subjectId}`);
  };
  return {getClasses};
};

export default {create};
