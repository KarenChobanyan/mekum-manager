export interface ILoginResponse{
    token: string;
    error: null | string;
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