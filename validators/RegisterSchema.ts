import * as Yup from "yup";

export interface RegisterSchema {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterInitialValues: RegisterSchema = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterValidation = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required("El nombre es obligatorio."),
  email: Yup.string()
    .email("Ingresa un correo electrónico válido.")
    .required("El correo es obligatorio."),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .required("La contraseña es obligatoria."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
    .required("Confirma tu contraseña."),
});
