import { getLoginSchema, getRegisterSchema } from "@/core";
import * as z from "zod";

export type registerPayload = z.infer<ReturnType<typeof getRegisterSchema>>;

export type loginPayload = z.infer<ReturnType<typeof getLoginSchema>>;