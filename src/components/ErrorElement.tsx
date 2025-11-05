/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NoAccessPageError from "./NoAccessPageError";
import NotFoundPageError from "./NotFoundPageError";

export default function ErrorElement() {
  const error: any = useRouteError();

  const IS_403_ERROR_PAGE =
    (isRouteErrorResponse(error) && error.status === 403) ||
    (isAxiosError(error) && error.response?.status === 403) ||
    error?.statusCode === 403;

  return (
    <>{IS_403_ERROR_PAGE ? <NoAccessPageError /> : <NotFoundPageError />}</>
  );
}
