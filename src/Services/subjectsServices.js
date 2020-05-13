import api from './Api';

const create = () => {
  const getSubjects = action => {
    api.api.setHeader('Authorization', localStorage.getItem("Authorization"))
    return api.api.get('/Subject/GetSubjectsDropDown');
  };
  return {getSubjects};
};

export default {create};
