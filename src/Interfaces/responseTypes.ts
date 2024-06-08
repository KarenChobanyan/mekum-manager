export interface ILoginResponse {
  token: string;
  error: null | string;
};

export interface IGetMeResponse {
  data: IGetMeResponseData;
};

export interface IGetMeResponseData {
  id?: number;
  role_id?: number;
  mekum_id?: string | null;
  username?: string;
  name?: string;
  surname?: string;
  created_at?: string,
  updated_at?: string
};

export interface IEmployee {
  id: number,
  firstName: string,
  lastName: string,
  fullName: string,
};

export type GetEmployeesResponseData = IEmployee[];

export interface IWarehouse {
  id: number,
  name: string,
  address: string
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

export interface IMeasurementUnit {
  id: number,
  code: number,
  unit: string,
  abbreviation: string,
  coefficient: number,
  parentId: number | null,
  isDefault: number
};

export interface IAllGoodsResponseData {
  id: number,
  code: number,
  name: string,
  measurementUnitId: number,
  measurementUnit: IMeasurementUnit,
  classificationId: null,
  accountId: number,
  barCode: number | null,
  billingMethodId: any,
  characteristic: any,
  externalCode: any,
  hcbCoefficient: any,
  isAah: any,
  materialValueGroupId: any,
  retailRevenueAccountId: any,
  salesExpenseAccountId: any,
  retailerPrice: any,
  salesRevenueAccountId: any,
  wholesalePrice: any
  image: any,
  cpvCodeId: any,
  isDeductible: number
};

export type AllGoodsResponse = IAllGoodsResponseData[]

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
  id: number,
  documentDate: string,
  partners: IGetPartnersRespData,
  documentNumber: number
  warehouseEntryOrderProduct: IWarehouseEntryOrderProduct[]
};

export interface IWarehouseEntryOrderProduct {
  money: number
};

export type IWarehouseEntryResponse = IWarehouseEntryResponseData[] | [];

export interface IGoodBatch {
  wareEntryOPrId: number,
  warehouseEntryOrderId: number,
  materialValueId: number,
  quantity: number,
  price?: number,
  money?:number
};

export type GetGoodBatchesResponse = IGoodBatch[];

export interface IWarehouseExitResponseData {
  id: number;
  documentNumber: number;
  expenseAccountId: number;
  expenseAccount: IExpenseAccount;
  hasRequested?: null;
  accountant?: null;
  allow?: null;
  comment?: null;
  container?: null;
  date: string;
  mediator?: null;
  powerOfAttorney?: null;
  warehouseId: number;
  warehouse: IWarehouse;
  exitSpecification?: (IExitSpecificationEntity)[] | null;
  warehouseSignificanceId?: null;
  warehouseExitOrderOperation?: (null)[] | null;
  draft: number;
};

export interface IExpenseAccount {
  id: number;
  name: string;
  account: string;
  isAccumulatedAccount: number;
  acumulatedAccountId: string;
  offBalanceSheet: number;
  accountingByPartners: number;
  analyticalGroup1?: number;
  analyticalGroup2?: number;
  calculationsTypeId: string;
  disregard: number;
};

export interface IExitSpecificationEntity {
  id: number;
  warehouseExitOrderId: number;
  warehouseEntryOrderId: number;
  wareEntryOPrId: number;
  warehouseExitOrderProductId: number;
  accInvProdId?: null;
  quantity: number;
  materialValueId: number;
  createdAt: string;
  updatedAt: string;
  money?: null;
};


export type WarehouseExitResponse = IWarehouseExitResponseData[];

export interface IAccountInvoiceResponseData {
  id: number;
  date: string;
  documentNumber: number;
  partnerId: number;
  partner: IGetPartnersRespData;
  lineCode?: null;
  contract?: null;
  contractDate?: null;
  subsectionId?: null;
  seria?: null;
  number?: null;
  dateOfDischarge?: null;
  comment?: null;
  warehouseId: number;
  warehouseSignificanceId?: null;
  accountInvoiceProduct?: (IAccountInvoiceProductEntity)[] | null;
  accountInvoiceFunction?: (null)[] | null;
  accountInvoiceSpecification?: (AccountInvoiceSpecificationEntity)[] | null;
  aahType: number;
  draft: number;
  returned: number;
  placeOfDelivery: string;
  destination?: null;
  currencyId: number;
  currencyExchangeRate: number;
  buyerAccountId: number;
  vatAccountId?: null;
  previousDayCurrencyExchangeRate?: null;
  fromDate?: null;
  receiptPrepaymentAccountId?: null;
  invoiceId?: null;
  autlandingType?: null;
  retailSales: number;
  cashRegisterReceipt?: null;
  paymentType?: null;
  cashRegisterId?: null;
  billingAccountInBanksId?: null;
  accountId?: null;
  membershipId?: null;
  isPaid?: null;
  serviceProvider?: null;
  productProvider: number;
  accDocSubmittedAccountInvoice?: (null)[] | null;
  deliveryDate?: null;
  emailHistory?: (null)[] | null;
};

export interface IAccountInvoiceProductEntity {
  id: number;
  accInvId: number;
  warehouseSignificanceId: number;
  warehouseId: number;
  materialValueId: number;
  point: string;
  count: number;
  money: number;
  moneyAmd: number;
  isAah: number;
  expenseAccountId?: number;
  revenueAccountId?: number;
  availability: number;
  parentId?: number;
  date: string;
  measurementUnitValue: number;
  measurementUnitId: number;
  moneyWithoutDiscount?: number;
  discount?: number;
  exciseTax: number;
  exciseTaxTotal: number;
};
export interface AccountInvoiceSpecificationEntity {
  id: number;
  accInvId: number;
  warehouseEntryOrderId: number;
  wareEntryOPrId: number;
  quantity: number;
  materialValueId: number;
  createdAt: string;
  updatedAt: string;
  money: number;
  accInvProdId: number;
};

export type AccounInvoiceResponce = IAccountInvoiceResponseData[];




