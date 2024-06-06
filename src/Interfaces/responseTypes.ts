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

  export type GoodsResponseData = IGoods[];

  export interface IGetPartnersResponse {
    code: number;
    data?: IGetPartnersRespData[] | null;
    message: string;
  };

  export interface IGetPartnersRespData {
    id: number;
    hvhh: string;
    publicServiceNumber?: null;
    name: string;
    accountantPositionId?: null;
    anotherAdditionalInformation?: null;
    anotherCredentialsNumber?: null;
    anotherCredentialsDate?: null;
    anotherDeliveryTime?: null;
    anotherFullname?: null;
    contract?: null;
    certificateNumber?: null;
    dateContract?: null;
    email?: null;
    fullName?: null;
    headPositionId?: null;
    phone?: null;
    legalAddress?: null;
    mainPurposeOfPayment?: null;
    passportNumber?: null;
    percentageOfSalesDiscount?: null;
    practicalAddress?: null;
    code: number;
    additionalAddressePartners?: (null)[] | null;
    billingAccounts?: (null)[] | null;
    partnersEmails?: (null)[] | null;
    documentTypeId?: null;
  };

  export interface IWarehouseEntryResponseData {
    id:number,
    documentDate:string,
    partners:IGetPartnersRespData,
    documentNumber:number
    warehouseEntryOrderProduct: IWarehouseEntryOrderProduct[]
  };

  export interface IWarehouseEntryOrderProduct {
    money:number
  };

  export type IWarehouseEntryResponse = IWarehouseEntryResponseData[] | [];

  
  
  