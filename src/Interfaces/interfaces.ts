import { FieldValues, UseFormRegister } from "react-hook-form";
import { ICachIncomingFormValues } from "../Pages/ActionPages/CashIncoming/Create/createCashIncoming-hooks";

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
};

export type InputRegisterTypes = UseFormRegister<
  FieldValues | ILoginFormValues | SearchInputValues | ICachIncomingFormValues | ISignUpFormValues
>;

export enum ISIN {
  TRUE = 'true',
  FALSE = 'false'
};

export interface ISignUpFormValues {
  firstName:string,
  lastName:string,
  email:string,
  password:string
};