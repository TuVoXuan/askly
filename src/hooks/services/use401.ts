import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ERoutePath } from "../../routes/route-path.enum";
import { getLocalStorageItem } from "../../utils/LocalStorage";

export type AccessToken = {
  isRememberMe: boolean;
  refreshToken: string;
}

function use401() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [is401, setIs401] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const refreshTokenHandler = useCallback(() => {
    setIs401(true);
    try {
      const oldToken = getLocalStorageItem<AccessToken>('access_token');
      if(oldToken && oldToken.isRememberMe){
        // Here you would typically call an API to refresh the token using oldToken.refreshToken
        // Call api to get new token
      }else {
        setIsExpired(true);
        throw new Error('Token is expired');
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      const loginURL = ERoutePath.SIGN_IN;
      if(pathname !== `/${loginURL}`){
        navigate(`/${loginURL}?redirect=${encodeURIComponent(pathname)}`, {replace: true});
      }
    }
  }, [pathname, setIs401, setIsExpired, navigate]);

  return {
    is401,
    isExpired,
    refreshTokenHandler,
  };
}

export default use401;