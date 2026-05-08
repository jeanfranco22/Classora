import * as Yup from "yup";

export interface LoginSchema {
  email: string;
  password: string;
}

export const LoinInitialValuse: LoginSchema = {
  email: "",
  password: "",
};
