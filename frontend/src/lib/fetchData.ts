import axios from 'mockAxios';

export const queryKeys = {
  userInfoByEmail: (email: string) => ['userInfo', email] as const,
  teamInfoByTeamName: (teamName: string) => ['teamInfo', teamName] as const,
  teamInfoByTeamId: (teamId: string) => ['teamInfo', teamId] as const,
};

export const getTeamInfoByTeamId = (teamId: string) =>
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/team/info`, {
    params: { teamId },
  });

export const updateTeamName = (teamId: string, newName: string) =>
  axios.put(`${process.env.REACT_APP_API_BASE_URL}/team/changeName`, {
    teamId,
    newName,
  });

export const getUserInfoByEmail = (email: string) =>
  axios.get<{
    image: string;
    name: string;
    email: string;
  }>(`${process.env.REACT_APP_API_BASE_URL}/user/search`, {
    params: { email },
  });

export const getTeamInfoByTeamName = (teamName: string) =>
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/team/search`, {
    params: { teamName },
  });

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
