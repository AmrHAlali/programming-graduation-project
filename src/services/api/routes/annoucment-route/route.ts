import { AxiosInstance } from "axios";
import { AnnoucmentsEnumUrls } from "./enum";
import { AnnoucmentRoute } from "./types";

export const createAnnoucmentRoute = (apiClient: AxiosInstance): AnnoucmentRoute => ({
    getAllAnnoucments: () => {
        return apiClient.get(AnnoucmentsEnumUrls.getAllAnnoucments);
    },
});
