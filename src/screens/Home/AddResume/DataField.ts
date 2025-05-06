import { Field } from "../type";

export const personalInfoFields: Array<Field> = [
  {
    label: "Name",
    key: "name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    label: "Address",
    key: "address",
    type: "text",
    placeholder: "Enter address (comma separated)",
    maxLength: 100,
  },
  {
    label: "Phone Number",
    key: "phone",
    type: "number",
    placeholder: "Enter phone no.",
  },
  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter email",
  },
];
