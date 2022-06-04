import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = axios.create();
const mock = new MockAdapter(mockAxios, { delayResponse: 500 });

mock.onPost('/api/signup').reply(config => {
  const data = JSON.parse(config.data);
  const errors: string[] = [];

  if (data.nickname === 'dup') {
    errors.push('name already exists');
  }
  if (data.email === 'dup@dup.com') {
    errors.push('email already exists');
  }

  if (errors.length > 0) {
    return [400, errors];
  }

  return [202];
});

mock.onPost('/api/login').reply(config => {
  const data = JSON.parse(config.data);
  const errors: string[] = [];

  if (data.ID === 'wrong' || data.password == 'wrong') {
    errors.push('ID or password is wrong');
  }

  if (errors.length > 0) {
    return [400, errors];
  }

  return [200];
});

export default mockAxios;
