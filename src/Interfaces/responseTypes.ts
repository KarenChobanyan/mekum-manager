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
  company_id?:number;
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
export type GetUsersResponse = IGetMeResponseData[];

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

export interface AllGoodsResponse {
  result: IAllGoodsResponseData[],
  total: number,
};

export interface IGetPartnersResponse {
  result: IGetPartnersRespData[] | null;
  total: number;
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

export interface IWarehouseEntryResponse {
  result: IWarehouseEntryResponseData[] | [],
  total: number
};

export interface IGoodBatch {
  wareEntryOPrId: number,
  warehouseEntryOrderId: number,
  materialValueId: number,
  quantity: number,
  price?: number,
  money?: number
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


export interface WarehouseExitResponse {
  result: IWarehouseExitResponseData[],
  total: number
};

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

export interface AccounInvoiceResponce {
  result: IAccountInvoiceResponseData[] | [],
  total: number
};

export interface ICashRegisterResponseData {
  account: Account;
  accountId: number;
  code: number;
  deoN?: null;
  dmoN?: null;
  hdmNonTaxable?: null;
  hdmPrintType?: null;
  hdmRegisN?: null;
  hdmTaxable?: null;
  currencyId: number;
  ip?: null;
  isMain: number;
  name: string;
  password?: null;
  port?: null;
  id: number;
};
export interface Account {
  id: number;
  name: string;
  account: string;
  isAccumulatedAccount: number;
  acumulatedAccountId: string;
  offBalanceSheet: number;
  accountingByPartners: number;
  analyticalGroup1?: null;
  analyticalGroup2?: null;
  calculationsTypeId: string;
  disregard: number;
};

export interface CashRegistersResponse {
  result: ICashRegisterResponseData[],
  total: number
};

export interface ICashoutResponseData {
  entryCashRegisterId:number,
  exitCashRegisterId:number,
  money:number,
  id: number;
  exitCashRegister:{
    name:string
  },
  entryCashRegister:{
    name:string
  },
  cashRegisterId: number;
  date: string;
  documentNumber: number;
  correspondentAccountId: number;
  exitAccountId?: null;
  currencyId: number;
  amountCurrency1: number;
  amountCurrency2: number;
  accumulatedAmount?: null;
  partnersId?: null;
  received?: null;
  npNshPassword?: null;
  basis?: null;
  appendix?: null;
  otherInformation?: null;
  optiona?: null;
  typicalOperation?: null;
  cashRegister: CashRegister;
  currencies: Currencies;
  provide?: null;
  warehouseSignificanceId: number;
  hmGoalId?: null;
  transactionId: number;
  currencyRate: number;
  paymentGoal?: null;
  draft: number;
  cashRegisterExitFunctions?: (null)[] | null;
  accountInvoiceId?: null;
}
export interface CashRegister {
  id: number;
  code: number;
  name: string;
  accountId: number;
  isMain: number;
  dmoN?: null;
  deoN?: null;
  hdmRegisN?: null;
  ip?: null;
  port?: null;
  password?: null;
  hdmNonTaxable?: null;
  hdmTaxable?: null;
  hdmPrintType?: null;
  currencyId: number;
};

export interface IAllCashRegistersResponse {
  result: CashRegister[],
  total: number
};

export interface Currencies {
  id: number;
  name: string;
  currency: string;
  isDefault: number;
};

export interface CashOutResponse {
  result: ICashoutResponseData[],
  total: number,
};

export interface IWarehouseSignificance {
  id: number;
  name: string;
  expenseAccountId: number;
  partnerAccountId: number;
  prepaymentAccountId: number;
  outFlowAccountId?: null;
  inflowAccountId?: null;
  givenPrepaymentAccountId: number;
  debPartnerAccountId: number;
  estimateCode?: null;
  economicActivityClassifierId: number;
  taxableIncomeId: number;
  isBasic: number;
  isDefault: number;
  forEstimate: number;
};

export interface IMovementNAProduct {
  id: number;
  name: string;
  point:string,
  materialValueId:number,
  count:number,
  measurementUnitId:number,
  expenseAccountId: number;
  partnerAccountId: number;
  prepaymentAccountId: number;
  outFlowAccountId?: null;
  inflowAccountId?: null;
  givenPrepaymentAccountId: number;
  debPartnerAccountId: number;
  estimateCode?: null;
  economicActivityClassifierId: number;
  taxableIncomeId: number;
  isBasic: number;
  isDefault: number;
  forEstimate: number;
};

export type MovementNAProducts = IMovementNAProduct[];

export interface IGetWarehouseTransferResponseData {
  id: number,
  date: string,
  documentNumber: number,
  warehouseOutId: number,
  warehouseOut: IWarehouse,
  warehouseEnter: IWarehouse,
  warehouseEnterId:number,
  warehouseSignificance: IWarehouseSignificance,
  movementNAProduct: MovementNAProducts,
  draft: number
};
export interface GetWarehouseTransferResponse {
  result: IGetWarehouseTransferResponseData[],
  total: number
};

export interface IWarehouseReturnData {
  id: number,
  date: string,
  documentNumber: number,
  partner: IGetPartnersRespData
};

export interface WarehouseReturnsResponse {
  result: IWarehouseReturnData[],
  total: number
};

export interface IReturnableProductResponseData {
  id: number;
  material_value_id_out: number;
  material_value_id_in: number;
  created_at: string;
  updated_at: string;
};

export type GetReturnableProductsResponse = IReturnableProductResponseData[];







