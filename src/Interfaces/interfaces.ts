import { FieldValues, UseFormRegister } from "react-hook-form";

export interface ILoginFormValues {
    username: string;
    password: string;
  }
  
  export type RegisterFormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  export interface SearchInputValues {
    search: string;
  }

  export type InputRegisterTypes = UseFormRegister<
  FieldValues | ILoginFormValues | SearchInputValues
>;