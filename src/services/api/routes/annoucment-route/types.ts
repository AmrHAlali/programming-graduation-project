import { GenericResponse } from "../types";
import { getAllAnnoucmentsResponse } from "./res";

export type AnnoucmentRoute = {
    getAllAnnoucments: () => Promise<GenericResponse<getAllAnnoucmentsResponse[]>>;
};
