import { AxiosInstance } from "axios";
import { AuthRoute } from "./types";
import { AuthEnumUrls } from "./enum";

export const createAuthRoute = (apiClient: AxiosInstance): AuthRoute => ({
    register: (payload) => apiClient.post<AuthEnumUrls.register, any>(AuthEnumUrls.register, payload),
    login: (payload) => apiClient.post<AuthEnumUrls.login, any>(AuthEnumUrls.login, payload),
});
