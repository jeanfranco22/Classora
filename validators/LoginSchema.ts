import * as Yup from "yup";

export interface LoginSchema {
  email: string;
  password: string;
}

export const LoginInitialValues: LoginSchema = {
  email: "",
  password: "",
};

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo electrónico válido.")
    .required("El correo es obligatorio."),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .required("La contraseña es obligatoria."),
});

export const LoinInitialValuse = LoginInitialValues;
