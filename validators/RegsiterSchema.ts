import { Phone } from "lucide-react";
import * as Yup from "yup";

export interface RegisterSchema {
  email: string;
  password: string;
  confirmpassword: string;
  addres: string;
  phone: string;
  birthdate: string;
  city: string;
}

export const RegisterInitialValues: RegisterSchema = {
  email: "",
  password: "",
  confirmpassword: "",
  addres: "",
  phone: "",
  birthdate: "",
  city: "",
};

export const RegisterValidation = Yup.object().shape({
  email: Yup.string()
    .email("Este campo debe ser un correo electronico valido")
    .required("Este campo es obligatrio"),
  password: Yup.string()
    .min(6, "La contraseña debe contener 6 campos al menos")
    .required("Este campo es obligatorio"),
  comfirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debes confirmar tu contraseña"),
  addres: Yup.string().required("la direccion es requerida"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9+\-\s()]+$/, "El teléfono debe tener caracteres válidos")
    .min(8, "Muy corto")
    .max(15, "Muy largo")
    .required("Campo obligatorio"),
  birthdate: Yup.string().required("La fecha es requerida"),
  city: Yup.string().required("La ciudad es requerida"),
});
