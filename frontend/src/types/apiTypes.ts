interface teamMateListType {
  profile: string;
  name: string;
  email: string;
  role: string;
  status: string;
  uid: string;
}

export interface teamInfoType {
  teamName: string;
  yourRole: string;
  teamMateList: teamMateListType[];
}

export interface TeamListType {
  teamAvatarUrl: string;
  teamName: string;
  teamId: string;
}

export interface userInfoType {
  image?: string;
  name: string;
  email: string;
}

export interface userTeamDetailType {
  teamName: string;
  role: 'admin' | 'owner' | 'user';
  teamId: string;
}
