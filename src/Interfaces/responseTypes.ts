export interface ILoginResponse{
    token: string;
    error: null | string;
 };

 

  export interface IGetMeResponse {
    data: IGetMeResponseData;
  }

  export interface IGetMeResponseData {
    id?: number;
    role_id?:number;
    mekum_id?:string | null;
    username?: string;
    name?: string;
    surname?: string;
    created_at?:string,
    updated_at?:string
  }