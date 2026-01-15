import { resources } from "./resources";
import { RecursiveKeyOf } from "./types";

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;