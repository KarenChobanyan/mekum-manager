export interface IStorageIncomeRequestData {
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

 