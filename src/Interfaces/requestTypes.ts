import { IGoodBatch } from "./responseTypes";

export interface IPostStorageIncomeRequestData {
  documentDate: string,
  warehouseId: number,
  partnersId: number,
  goods: IGoodsData[]
}

export interface IGoodsData {
  materialValueId: number;
  point: string;
  count: number;
  warehouseId: number;
  price: number;
  discount: number;
  money: number;
  measurementUnitId: number;
  measurementUnitValue: number;
}

export type IPaginationQuery = {
  offset: number;
  limit: number;
};

export interface IGetStorageEntriesRequestData {
  id: string,
  offset: number,
  limit: number
};

export interface IGetGoodBatchRequest {
  warehouseId: string,
  materialValueId: string
};

export interface IPostWarehouseExitRequest {
  documentDate: string,
  warehouseId: number,
  partnerId: number,
  goods: IExitGoods[]
};

export interface IExitGoods {
  materialValueId: number;
  point: string;
  count: number;
  warehouseId: number;
  money: number;
  exits: IGoodBatch[];
  discount?:number;
  measurementUnitId: number
};

export interface ICashoutRequest {
  date: string,
  cashRegisterId: number,
  money: number,
  partnersId:number,
};

export interface IWarehouseTransferRequest {
  documentDate: string,
  warehouseOutId: number,
  warehouseEnterId: number,
  goods: IWarehouseTransferGood[]
};
export interface IAcceptWarehouseTransferRequest {
  id:number,
  data:{
    documentDate: string,
    warehouseOutId: number,
    warehouseEnterId: number,
    goods: IWarehouseTransferGood[],
    documentNumber:number
  }
};

export interface IWarehouseTransferGood {
  materialValueId: number,
  point: string,
  count: number,
  warehouseOutId: number,
  warehouseEnterId: number,
  measurementUnitId: number,
  availability: number,
  exits: IGoodBatch[]
};

export interface IPostWarehouseReturnRequest {
  documentDate: string,
  warehouseId: number,
  partnerId: number,
  goods: IWarehouseReturnGood[]
};

export interface IWarehouseReturnGood {
  materialValueId: number,
  point: string,
  count: number,
  warehouseId:number, 
  measurementUnitId: number,
};

export interface IPostReturnable {
  material_value_id_out:number,
  material_value_id_in:number
};

export type PostRetunableRequestData = IPostReturnable[];

export interface IGetWarehouseTransfersRequestData {
  id:string,
  limit:number,
  offset:number,
  isIn:string
};

export interface IPostCashTransfer {
  entryCashRegisterId:number,
  exitCashRegisterId:number,
  money:number,
};

