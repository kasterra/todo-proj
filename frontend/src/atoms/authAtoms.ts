import { atom } from 'jotai';

export interface IAuth {
  token: string;
}

const internalAuthAtom = atom(
  (localStorage.getItem('authAtom') as string) ?? '',
);

export const authAtom = atom(
  get => get(internalAuthAtom),
  (_, set, newToken: string) => {
    set(internalAuthAtom, newToken);
    localStorage.setItem('authAtom', newToken);
  },
);
