import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IAuth {
  AccessToken: string;
  RefreshToken: string;
}

export const authAtom = atom<IAuth>({
  key: 'authAtom',
  default: {
    AccessToken: '',
    RefreshToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});
