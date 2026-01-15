import * as z from "zod";
import i18n from "../i18n";
import parsePhoneNumber, { CountryCode, getCountryCallingCode } from "libphonenumber-js";

// apply login schema with attriubtes: username, password
export const getLoginSchema = () => {
    return z.object({
        username: z.string().min(1, i18n.t("validation:required", { field: i18n.t("authentication:username") })),
        password: z.string().min(6, i18n.t("validation:minLength", { field: i18n.t("authentication:password"), length: 6 })),
    });
}

export const getRegisterSchema = () => {
    return z.object({
        name: z.string().min(1, i18n.t("validation:required", { field: i18n.t("authentication:name") })),
        username: z.string().min(1, i18n.t("validation:required", { field: i18n.t("authentication:username") })),
        password: z.string().min(6, i18n.t("validation:minLength", { field: i18n.t("authentication:password"), length: 6 })),
        email: z
            .string()
            .min(1, i18n.t("validation:required", { field: i18n.t("authentication:email") }))
            .email(i18n.t("validation:invalid", { field: i18n.t("authentication:email") })),
        bio: z
            .string()
            .max(200, i18n.t("validation:maxLength", { field: i18n.t("profile:bio"), length: 200 }))
            .optional()
            .or(z.literal("")),
    });
}

export const getCreatePostSchema = () => {
    return z.object({
        content: z.string().min(1, i18n.t("validation:required", { field: i18n.t("common:post") })),
    });
}