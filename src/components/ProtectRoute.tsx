import type { AccessToken } from "@/hooks/services/use401";
import { ERoutePath } from "@/routes/route-path.enum";
import useUserStore from "@/store/AppStore";
import { getLocalStorageItem } from "@/utils/LocalStorage";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectRoute() {
  const tokenObject = getLocalStorageItem<AccessToken>("access_token");
  const { user } = useUserStore();

  const { pathname, search } = useLocation();
  const redirectPath = `${pathname}${search}`;

  if (!tokenObject?.refreshToken || !user) {
    return (
      <Navigate
        to={`/${ERoutePath.SIGN_IN}?redirect=${encodeURIComponent(
          redirectPath
        )}`}
      />
    );
  }

  return <Outlet />;
}
