import { AxiosError } from "axios";
import { ErrorResponse } from "./types";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";
import { AuthStatusEnum, useUserStore } from "@/core";
import { BackHandler } from "react-native";

export const extractError = (error: AxiosError<ErrorResponse>): string => {
  let err: string = "";

  for (const key in error.response?.data.errors) {
    err = error.response?.data.errors[key];
    break;
  }

  return Array.isArray(err)
    ? err[0]
    : (err || error.response?.data || "").toString();
};

export const apiErrorHandler = (
  statusCode: number,
  error: AxiosError<ErrorResponse>
) => { //  -> you can show message or something depends on error
  if (statusCode === 600) {
    // Special handling for 600 status code
    const { message, code } = error.response?.data || {};
  }

  switch (statusCode) {
    case 502: {
      showMessage({
        message: "Internal Server Error :(",
        description: "Please try again later.",
        ...getFlashMessageStyle().error,
      });

      // close the application after 3 seconds
      setTimeout(() => {
        BackHandler.exitApp();
      }, 3000);
      return;
    }

    case 401: {
      showMessage({
        message: "Invalid Credentials :(",
        description: "Username or Password is incorrect.",
        ...getFlashMessageStyle().error,
      });

      return;
    }

    case 500: {
      showMessage({
        message: "Something went wrong.",
        description: "Don't worry, it'll retry automatically.",
        ...getFlashMessageStyle().error,
      });

      return;
    }

    // case 403: {
    //   const hadAuthHeader = !!(error.config as any)?.headers?.Authorization;

    //   showMessage({
    //     message: "Whoops! Session Ended :(",
    //     description: "Your Session Has Expired, Please Login Again.",
    //     ...getFlashMessageStyle().error,
    //   });

    //   if (hadAuthHeader) {
    //     // Clear all persisted auth data when the server says the session is invalid
    //     useUserStore.getState().removeUserCredential();
    //   }
    //   return;
    // }

    default:
  }
};
