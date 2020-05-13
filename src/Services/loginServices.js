import api from './Api';

const create = () => {
  const login = action => {
    const {username, password} = action;
    const params = {
      userName: username,
      password,
      deviceToken: '',
      clientId: 'FoundationAPI',
      clientSecret: 'FoundationSecretKey'
    };
    return api.auth.post('/Auth/Token', params);
  };
  return {login};
};

export default {create};
