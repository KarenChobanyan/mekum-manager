import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { t } from 'i18next'
import moment from "moment";
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";
import { IAutocompleteData, IAutocompleteItem } from "../../Interfaces/componentTypes";
import { useGetAllWarehousesQuery, useGetEmployeesQuery, useGetGoodsQuery, useGetPartnersQuery, useGetWarehousesQuery } from "../../API/direcroriesApi";
import { GetEmployeesResponseData, GetWarehousesResponseData, GoodsResponseData, IGetPartnersRespData } from "../../Interfaces/responseTypes";
import { removeCurrentUser } from "../../Store/Slices/authSlice";

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
    dispatch(removeCurrentUser())
    navigate('/')
  };

  const onLogoClick = () => {
    accessToken
      ?
      navigate('/home')
      :
      navigate('/login')
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
    onLogoClick,
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
  const {data:partnersResponse}  = useGetPartnersQuery();
  const partners = partnersResponse?.data!;

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
    myWarehouses,
    allWarehouses,
    partners,
    cashBoxesData,
    payersData,
    roles,
    goods,
    employees
  }
};

export const useAutocompleteData = () => {
  const { employees, myWarehouses, allWarehouses, goods,partners } = useDirectoriesHooks();
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

  const createPartnersData = (data: IGetPartnersRespData[]): IAutocompleteData | undefined => {
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
  const partnersData = createPartnersData(partners!);

  return {
    myWarehousesData,
    allWarehousesData,
    employeesData,
    goodsData,
    partnersData,
    getUnitType
  }
}
