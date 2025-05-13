import { Field } from "../Home/type";
import { RForm } from "./type";

export interface RField extends Omit<Field, "key"> {
  key: keyof RForm;
}

export const emptyRegisterFormData: RForm = {
  name: "",
  email: "",
  password: "",
  avatar: null as File | null,
};

export const registerDataFields: Array<RField> = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter Email Id",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
];
