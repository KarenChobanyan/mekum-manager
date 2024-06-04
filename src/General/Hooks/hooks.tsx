import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { t } from 'i18next'
import moment from "moment";
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";
import { IAutocompleteData, IAutocompleteItem } from "../../Interfaces/componentTypes";
import { useGetAllWarehousesQuery, useGetEmployeesQuery, useGetGoodsQuery, useGetWarehousesQuery } from "../../API/direcroriesApi";
import { GetEmployeesResponseData, GetWarehousesResponseData, GoodsResponseData } from "../../Interfaces/responseTypes";

export const useGeneralHooks = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const accessToken = localStorage.getItem("mm_access_token");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state?.auth?.currentUser
  );
  const formatDate = (date: Date) => {
    return moment(date).format("DD.MM.YYYY");
  };
  const mobileScreen: boolean = window.innerWidth < 480;
  const mediumScreen: boolean = window.innerWidth < 680;
  const largeScreen: boolean = window.innerWidth > 920;

  const onLogout = () => {
    localStorage.removeItem("mm_access_token");
    navigate('/')
  };

  return {
    t,
    i18n,
    params,
    location,
    accessToken,
    largeScreen,
    mobileScreen,
    mediumScreen,
    currentUser,
    onLogout,
    dispatch,
    navigate,
    formatDate,
  };
};

export const useDirectoriesHooks = () => {
  const { data: myWarehouses } = useGetWarehousesQuery();
  const { data: employees } = useGetEmployeesQuery();
  const { data: allWarehouses } = useGetAllWarehousesQuery();
  const { data: goods } = useGetGoodsQuery();
  console.log(myWarehouses, "warehouses")
  console.log(employees, "employees")
  const unitData: IAutocompleteItem[] = [
    { id: "1", title: "Տուփ" },
    { id: "2", title: "կգ" }
  ];

  const suppliersData: IAutocompleteItem[] = [
    { id: "1", title: "Մատակարար 1" },
    { id: "2", title: "Մատակարար 2" }
  ];

  const recipientData: IAutocompleteItem[] = [
    { id: "1", title: "Ստացող 1" },
    { id: "2", title: "Ստացող 2" }
  ];

  const buyersData: IAutocompleteItem[] = [
    { id: "1", title: "Գնորդ 1" },
    { id: "2", title: "Գնորդ 2" }
  ];

  const cashBoxesData: IAutocompleteItem[] = [
    { id: "1", title: "Դրամարկղ 1" },
    { id: "2", title: "Դրամարկղ 2" }
  ];

  const payersData: IAutocompleteItem[] = [
    { id: "1", title: "Վճարող 1" },
    { id: "2", title: "Վճարող 2" }
  ];

  const roles: IAutocompleteItem[] = [
    { id: "1", title: t('Roles.Admin') },
    { id: "2", title: t('Roles.User') }
  ];

  return {
    unitData,
    myWarehouses,
    allWarehouses,
    suppliersData,
    recipientData,
    buyersData,
    cashBoxesData,
    payersData,
    roles,
    goods,
    employees
  }
};

export const useAutocompleteData = () => {
  const { employees, myWarehouses, allWarehouses, goods } = useDirectoriesHooks();
  const myWarehousesIds = myWarehouses?.map((item) => item.id);
  const filteredWarehouses = allWarehouses?.filter((item) => !myWarehousesIds?.includes(item.id))
  const createWarehouseData = (data: GetWarehousesResponseData): IAutocompleteData | undefined => {
    if (data) {
      return data!.map((item) => {
        return {
          id: String(item.id),
          title: item.name
        }
      })
    } else {
      return undefined
    }
  };
  const createEmployeeData = (data: GetEmployeesResponseData): IAutocompleteData | undefined => {
    if (data) {
      return data!.map((item) => {
        return {
          id: String(item.id),
          title: item.fullName
        }
      })
    } else {
      return undefined
    }
  };
  const createGoodsData = (data: GoodsResponseData): IAutocompleteData | undefined => {
    if (data) {
      return data!.map((item) => {
        return {
          id: String(item.code),
          title: item.materialValue
        }
      })
    } else {
      return undefined
    }
  };

  const getUnitType = useCallback((id: string) => {
    if (goods?.length) {
      const unit = goods?.filter((item) => +id === item.code)[0].point;
      return unit
    } else {
      return ""
    }
  }, [goods]);

  const myWarehousesData = createWarehouseData(myWarehouses!);
  const allWarehousesData = createWarehouseData(filteredWarehouses!);
  const employeesData = createEmployeeData(employees!);
  const goodsData = createGoodsData(goods!);


  return {
    myWarehousesData,
    allWarehousesData,
    employeesData,
    goodsData,
    getUnitType
  }
}
