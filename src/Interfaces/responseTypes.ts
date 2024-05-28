export interface ILoginResponse{
    result: ILoginRespResultData;
    error: null | string;
 };

 export interface ILoginRespResultData {
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

  export interface IGetMeResponse {
    data: IGetMeResponseData;
  }

  export interface IGetMeResponseData {
    id: number;
    email: string;
    name: string;
    surname: string;
    avatar: string | null;
    number: string | null;
    socialSecurityCard: string | null;
    gender: string | null;
    birthDate: string | null;
  }