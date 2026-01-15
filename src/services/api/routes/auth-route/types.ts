import { GenericResponse } from "../types";
import { loginPayload, registerPayload } from "./req";
import { loginResponse, registerResponse } from "./res";

export type AuthRoute = {
    register: (payload: registerPayload) => Promise<GenericResponse<registerResponse>>;
    login: (payload: loginPayload) => Promise<GenericResponse<loginResponse>>;
};
