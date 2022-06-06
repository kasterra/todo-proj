import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = axios.create();
const mock = new MockAdapter(mockAxios, { delayResponse: 1500 });

mock.onPost('/api/user/SignUp').reply(config => {
  const data = JSON.parse(config.data);
  const errors: string[] = [];

  if (data.email === 'dup@dup.com') {
    errors.push('email already exists');
  }

  if (errors.length > 0) {
    return [400, errors];
  }

  return [202];
});

mock.onPost('api/user/SignIn').reply(config => {
  const data = JSON.parse(config.data);
  const errors: string[] = [];

  console.log(data);
  if (data.Email === 'wrong' || data.Password == 'wrong') {
    errors.push('ID or password is wrong');
  }

  if (errors.length > 0) {
    return [400, errors];
  }

  return [200, { Token: 'aaaaaa' }];
});

mock.onGet('api/user/Token').reply(config => {
  const auth = config.headers!.Authorization;
  console.log('auth', auth);
  return [200, { Name: 'lorem', Email: 'lorem@example.com' }];
});

mock.onPut('api/team/changeName').reply(config => {
  const body = JSON.parse(config.data);
  if (body.newName == 'wrong') {
    return [500, ['the team name is already in use']];
  }
  return [200];
});

mock.onPost('api/user/search').reply(config => {
  const data = JSON.parse(config.data);
  if (data.email == 'wrong' || data.email == '') {
    return [500];
  } else {
    return [
      200,
      {
        image: 'https://picsum.photos/id/238/50',
        name: data.email,
        email: 'lorem@example.com',
      },
    ];
  }
});

export default mockAxios;
