import { create } from "zustand";

type UserState = {
  user: IUser | null;
}

type UserAction = {
  setUser: (user: IUser | null) => void;
  signOut: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useUserStore = create<UserState & UserAction>((set, get) => ({
  user: null,
  setUser: (user: IUser | null) => set({user}),
  signOut: () => set({user: null}),
}))

export default useUserStore;
