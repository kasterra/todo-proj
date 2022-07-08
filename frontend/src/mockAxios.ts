import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = axios.create();
const mock = new MockAdapter(mockAxios, { delayResponse: 1500 });

let tokenHasFail = true;
let tokenHasChecked = false;
const isEmptyArray = false;
/**
 * check param
 * @param {string} token token for checking
 * @return {boolean} result of token validation
 */
function checkTokenHasFail(token: string) {
  if (
    (token === 'sometimesFail' && tokenHasFail) ||
    (!tokenHasChecked && token === 'sometimesFail')
  ) {
    console.log('Token expiration simulated');
    tokenHasFail = true;
    return true; // 토큰이 만료가 되는 상황을 가정함
  }
  tokenHasChecked = true;
  console.log('Token is okay');
  return false;
}

mock.onPost('/api/user/SignUp').reply(config => {
  console.log('hit api/user/signUp');
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
  console.log('hit api/user/signIn');
  const data = JSON.parse(config.data);
  const errors: string[] = [];

  console.log(data);
  if (data.Email === 'wrong' || data.Password == 'wrong') {
    errors.push('ID or password is wrong');
  }

  if (errors.length > 0) {
    return [400, errors];
  }

  return [200, { AccessToken: 'sometimesFail', RefreshToken: 'refreshToken' }];
});

mock.onGet('api/user/Refresh').reply(config => {
  console.log('hit api/user/Refresh');
  tokenHasFail = false;
  const { RefreshToken } = config.params;
  console.log('refreshToekn', RefreshToken);
  if (RefreshToken == 'refreshToken')
    return [
      200,
      { AccessToken: 'alreadyRefreshed', RefreshToken: 'refreshToken' },
    ];
  else {
    console.log('401 in api/Refresh');
    return [401];
  }
});

mock.onGet('api/user/Token').reply(config => {
  console.log('hit api/user/Token');
  const auth = config.headers!.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  console.log('auth', auth);
  return [200, { Name: 'lorem', Email: 'lorem@example.com' }];
});

mock.onPut('api/team/changeName').reply(config => {
  console.log('hit api/team/changeName');
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  const body = JSON.parse(config.data);
  if (body.newName == 'wrong') {
    return [500, ['the team name is already in use']];
  }
  return [200];
});

mock.onGet('api/user/search').reply(config => {
  console.log('hit api/user/search');
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
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
  console.log('hit api/team/search');
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  const { teamName } = config.params;
  if (teamName == 'wrong') {
    return [500];
  } else {
    return [200];
  }
});

mock.onGet('api/team/').reply(config => {
  console.log('hit GET api/team');
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  if (isEmptyArray) return [200, []];
  return [
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
  ];
});

mock.onGet(new RegExp('api/team/.+')).reply(config => {
  console.log('hit api/team/.+');
  const teamId = config.url!.split('/')[3];
  console.log('teamId: ' + teamId);
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  console.log('api hit', teamId);
  if (teamId == '1') {
    console.log('teamId1 200');
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
  } else if (teamId == '2') {
    console.log('teamId2 200');
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
  } else {
    console.log(500);
    return [200, {}];
  }
});

mock.onGet('/api/user/detail').reply(config => {
  const { userId } = config.params;
  console.log(`hit user detail API ${userId}`);
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  console.log('token is okay');
  if (userId == '1') {
    console.log('user 1 detail');
    return [
      200,
      {
        name: 'lorem kim',
        email: 'lorem@ipsum.com',
      },
    ];
  } else {
    console.log('another user detail');
    return [
      200,
      {
        name: 'something else',
        email: 'lorem@dolor.edu',
      },
    ];
  }
});

mock.onPut('/api/user/detail').reply(config => {
  console.log(`hit user detail API`);
  const auth = config.headers?.Authorization as string;
  if (!auth) return [401];
  const accessToken = auth.split(' ')[1];
  if (checkTokenHasFail(accessToken)) return [401];
  const { info } = JSON.parse(config.data);
  const errors: string[] = [];

  if (info.name === 'dup') {
    errors.push('username already exists');
  }
  if (info.email === 'dup@dup.com') {
    errors.push('email already exists');
  }
  if (errors.length > 0) {
    return [400, errors];
  }
  console.log('info i got', info);
  return [200];
});

export default mockAxios;
