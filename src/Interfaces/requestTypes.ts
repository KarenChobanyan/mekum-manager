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
}

export interface IGetGoodBatchRequest {
  warehouseId: string,
  materialValueId: string
}

export interface IPostWarehouseExitRequest {
  documentDate: string,
  warehouseId: number,
  partnerId: number,
  goods: IExitGoods[]
}

export interface IExitGoods {
  materialValueId: number;
  point: string;
  count: number;
  warehouseId: number;
  money: number;
  exits: IGoodBatch[]
}

export interface ICashoutRequest {
  date: string,
  cashRegisterId: number,
  money: number,
}
