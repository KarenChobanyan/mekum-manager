import { FieldValues, UseFormRegister } from "react-hook-form";

export interface LoginFormValues {
    result: ILoginRespData;
    error: null | string;
    email: string;
    password: string;
  }
  
  export type RegisterFormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  export interface ILoginRespData {
    email: string;
    password: string;
    id: number;
    name: string;
    surname: string;
    avatar: string | null;
    birthDate: string | null;
    emailValidationToken: string | null;
    emailVerified: boolean;
    forgetPasswordValidationToken: string | null;
    gender: string | null;
    number: string | null;
    socialSecurityCard: string | null;
    token: string;
  };

  export interface SearchInputValues {
    search: string;
  }

  export type InputRegisterTypes = UseFormRegister<
  FieldValues | LoginFormValues | SearchInputValues
>;