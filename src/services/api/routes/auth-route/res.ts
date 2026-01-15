import { IUserDetails } from "@/core/types/user";

export type registerResponse = {
    accessToken: string;
    refreshToken: string;
    message: string;
}

export type loginResponse = {
    accessToken: string;
    refreshToken: string;
    message: string;
}