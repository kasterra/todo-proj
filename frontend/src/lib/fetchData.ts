import { authAtom } from 'atoms/authAtoms';
import axios from 'mockAxios';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { teamInfoType, TeamListType, userInfoType } from 'types/apiTypes';
export const queryKeys = {
  userInfoByEmail: (email: string) => ['userInfo', email] as const,
  teamInfoByTeamName: (teamName: string) => ['teamInfo', teamName] as const,
  teamInfoByTeamId: (teamId: string) => ['teamInfo', teamId] as const,
  teamList: ['teamList'] as const,
};

const refreshToken = async () => {
  console.log('Refreshing refresh token');
  const RefreshToken = getRecoil(authAtom).RefreshToken;
  const res = await requestTokenRefresh(RefreshToken);
  setRecoil(authAtom, {
    AccessToken: res.data.AccessToken,
    RefreshToken: res.data.RefreshToken,
  });
  return res.data.AccessToken as string;
};

export const requestLogin = (Email: string, Password: string) =>
  axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/SignIn`, {
    Email,
    Password,
  });

export const requestSignUp = (Name: string, Email: string, Password: string) =>
  axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/SignUp`, {
    Name,
    Email,
    Password,
  });

export const getInfoByToken = (token: string) =>
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/Token`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const requestTokenRefresh = (RefreshToken: string) => {
  console.log('Refreshing token in fetChData', RefreshToken);
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/Refresh`, {
    params: { RefreshToken },
  });
};

export const getTeamInfoByTeamId = (teamId: string) => {
  const token = getRecoil(authAtom).AccessToken;
  console.log('getTeamInfoByTeamId', teamId);
  return axios.get<teamInfoType>(
    `${process.env.REACT_APP_API_BASE_URL}/team/${teamId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const updateTeamName = (teamId: string, newName: string) =>
  axios.put(`${process.env.REACT_APP_API_BASE_URL}/team/changeName`, {
    teamId,
    newName,
  });

export const getUserInfoByEmail = (email: string) =>
  axios.get<userInfoType>(`${process.env.REACT_APP_API_BASE_URL}/user/search`, {
    params: { email },
  });

export const getTeamInfoByTeamName = (teamName: string) => {
  const token = getRecoil(authAtom).AccessToken;
  return axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/team/${teamName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(() => {
      refreshToken();
      throw new Error('401');
    });
};

export const getTeamList = () => {
  const token = getRecoil(authAtom).AccessToken;
  return axios
    .get<TeamListType[]>(`${process.env.REACT_APP_API_BASE_URL}/team/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(() => {
      refreshToken();
      throw new Error('401');
    });
};

export const postNewTeam = (teamName: string) => {
  const token = getRecoil(authAtom).AccessToken;
  console.log('postNewTeam');
  return axios
    .post<TeamListType[]>(
      `${process.env.REACT_APP_API_BASE_URL}/team/`,
      {
        Name: teamName,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    .catch(() => {
      refreshToken();
      throw new Error('401');
    });
};
