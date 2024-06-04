export interface ILoginResponse{
    token: string;
    error: null | string;
 };

  export interface IGetMeResponse {
    data: IGetMeResponseData;
  };

  export interface IGetMeResponseData {
    id?: number;
    role_id?:number;
    mekum_id?:string | null;
    username?: string;
    name?: string;
    surname?: string;
    created_at?:string,
    updated_at?:string
  };

  export interface IEmployee {
    id:number,
    firstName:string,
    lastName:string,
    fullName:string,
  };

  export type GetEmployeesResponseData =IEmployee[];

  export interface IWarehouse {
    id:number,
    name:string,
    address:string
  };

  export type GetWarehousesResponseData = IWarehouse[];

  export interface IGoods {
    warehouseId: number;
    warehouseSignificanceId: number;
    warehouseEntryOrderId: number;
    materialValueId: number;
    point: string;
    count: number;
    price: number;
    date: string;
    warehouse: string;
    warehouseSignificance: string;
    materialValue: string;
    code: number;
    exitSpecification?: ExitSpecification;
    wholesalePrice?: null;
    totalCount: number;
    discount?: null;
  };

  export interface ExitSpecification {
  };

  export type GoodsResponseData = IGoods[]
  
  