import { atom } from 'jotai';

export interface IAuth {
  token: string;
}

export const authState = atom({
  token: '',
});
