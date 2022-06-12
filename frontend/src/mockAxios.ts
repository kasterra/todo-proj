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

mock.onGet('api/user/search').reply(config => {
  const { email } = config.params;
  if (email == 'wrong') {
    return [500];
  } else {
    return [
      200,
      {
        image: 'https://picsum.photos/id/238/50',
        name: email,
        email: 'lorem@example.com',
      },
    ];
  }
});

mock.onGet('api/team/search').reply(config => {
  const { teamName } = config.params;
  if (teamName == 'wrong') {
    return [500];
  } else {
    return [200];
  }
});

mock.onGet('api/team/info').reply(config => {
  const { teamId } = config.params;
  console.log('api hit', teamId);
  if (teamId == 1) {
    return [
      200,
      {
        teamName: 'team Lorem',
        yourRole: 'admin',
        teamMateList: [
          {
            profile: 'https://picsum.photos/50',
            name: 'lorem1',
            email: 'lorem@ipsum.com',
            role: 'admin',
            status: 'active',
            uid: 1,
          },
          {
            profile: 'https://picsum.photos/50',
            name: 'lorem2',
            email: 'lorem@ipsum.net',
            role: 'member',
            status: 'inactive',
            uid: 2,
          },
        ],
      },
    ];
  } else if (teamId == 2) {
    return [
      200,
      {
        teamName: 'team Ipsum',
        yourRole: 'member',
        teamMateList: [
          {
            profile: 'https://picsum.photos/50',
            name: 'lorem1',
            email: 'lorem@ipsum.com',
            role: 'admin',
            status: 'active',
          },
          {
            profile: 'https://picsum.photos/50',
            name: 'lorem2',
            email: 'lorem@ipsum.net',
            role: 'member',
            status: 'inactive',
          },
        ],
      },
    ];
  } else return [500];
});

mock.onGet('api/team/list').reply(() => [
  200,
  [
    {
      teamName: 'Team Lorem',
      teamId: 1,
      teamAvatarUrl: 'https://picsum.photos/200',
    },
    {
      teamName: 'Team Ipsum',
      teamId: 2,
      teamAvatarUrl: 'https://picsum.photos/200',
    },
  ],
]);

export default mockAxios;
