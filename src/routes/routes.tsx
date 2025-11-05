import ErrorElement from "@/components/ErrorElement";
import AxiosInterceptor from "../components/AxiosInterceptor";
import RootAuth from "../components/RootAuth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectRoute from "@/components/ProtectRoute";
import FormList from "@/pages/FormList";
import { ERoutePath } from "./route-path.enum";
import Signin from "@/pages/Auth/Signin/Signin";
import Signup from "@/pages/Auth/SignUp/Signup";

export const AppRoutes = createBrowserRouter([
  {
    element: <AxiosInterceptor />,
    errorElement: <ErrorElement />,
    children: [
      {
        element: <RootAuth />,
        children: [
          {
            element: <ProtectRoute />,
            children: [
              {
                index: true,
                element: <Navigate to={`/${ERoutePath.FORM_LIST}`} />,
              },
              {
                path: ERoutePath.FORM_LIST,
                element: <FormList />,
              },
            ],
          },
          {
            path: ERoutePath.SIGN_IN,
            element: <Signin />,
          },
          {
            path: ERoutePath.SIGN_UP,
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);
