import { Outlet } from "react-router-dom";
import { getLocalStorageItem } from "../utils/LocalStorage";
import useUserStore from "../store/AppStore";
import type { AccessToken } from "../hooks/services/use401";
import { useLayoutEffect } from "react";

export default function RootAuth() {
  const tokenObject = getLocalStorageItem<AccessToken>("access_token");
  const { user } = useUserStore();

  useLayoutEffect(() => {
    if (tokenObject?.refreshToken && !user) {
      // handle fetching user with refresh token
    }
  }, [tokenObject?.refreshToken, user]);

  if (tokenObject?.refreshToken && !user) return null;
  return <Outlet />;
}
