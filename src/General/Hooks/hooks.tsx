import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { t } from 'i18next'
import moment from "moment";
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";
import { IAutocompleteData, IAutocompleteItem } from "../../Interfaces/componentTypes";
import { useGetAllGoodsQuery, useGetAllWarehousesQuery, useGetCashRegistersQuery, useGetEmployeesQuery, useGetGoodBatchesQuery, useGetGoodsQuery, useGetPartnersQuery, useGetWarehouseGoodsQuery, useGetWarehousesQuery } from "../../API/direcroriesApi";
import { AllGoodsResponse, CashRegistersResponse, GetEmployeesResponseData, GetGoodBatchesResponse, GetWarehousesResponseData, GoodsResponseData, IAllGoodsResponseData, IGetPartnersRespData } from "../../Interfaces/responseTypes";
import { removeCurrentUser } from "../../Store/Slices/authSlice";
import { ISIN } from "../../Interfaces/interfaces";

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
  const { data: allGoods } = useGetAllGoodsQuery();
  const { data: partnersResponse } = useGetPartnersQuery();
  const {data:cashRegisters} = useGetCashRegistersQuery();
  const partners = partnersResponse?.data!;
  const roles: IAutocompleteItem[] = [
    { id: "1", title: t('Roles.Admin') },
    { id: "2", title: t('Roles.User') }
  ];

  return {
    myWarehouses,
    allWarehouses,
    partners,
    cashRegisters,
    roles,
    goods,
    allGoods,
    employees
  }
};

export const useAutocompleteData = (warehouseId?: string) => {
  const { employees, myWarehouses, allWarehouses, goods, allGoods, partners,cashRegisters } = useDirectoriesHooks();
  const { data: myGoods } = useGetWarehouseGoodsQuery(warehouseId!);
  const myWarehousesIds = myWarehouses?.map((item) => item.id);
  const filteredWarehouses = allWarehouses?.filter((item) => !myWarehousesIds?.includes(item.id));
  const warehouseDataTypes:IAutocompleteData = [
    {
      title:t('Forms.In'),
      id:ISIN.TRUE
    },
    {
      title:t('Forms.Out'),
      id:ISIN.FALSE
    }
  ]

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
          id: String(item.materialValueId),
          title: item.materialValue
        }
      })
    } else {
      return undefined
    }
  };

  const createAllGoodsData = (data: AllGoodsResponse): IAutocompleteData | undefined => {
    if (data) {
      return data!.map((item) => {
        return {
          id: String(item.id!),
          title: item.name!
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

  const creatCashRegistersData = (data: CashRegistersResponse): IAutocompleteData | undefined => {
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

  const getGoodsUnitType = useCallback((id: string) => {
    if (goods?.length) {
      const unit = goods?.filter((item) => +id === item.materialValueId)[0].point;
      return unit
    } else {
      return ""
    }
  }, [goods]);

  const getAllGoodsUnitType = useCallback((id: string) => {
    if (allGoods?.length) {
      const unit = allGoods?.filter((item) => +id === item.id)[0].measurementUnit.unit;
      return unit
    } else {
      return ''
    }
  }, [allGoods]);

  const getRemainder = (id: string) => {
    if (myGoods?.length) {
      const good = myGoods.filter((item) => item.materialValueId === +id)
      const remainder = good?.[0]?.totalCount!;
      return remainder
    } else {
      return undefined
    }
  };

  const setMeasurementUnitId = (id: string) => {
    if (myGoods?.length) {
      const good = allGoods?.filter((item) => item.id === +id)
      const measurementUnitId = good?.[0]?.measurementUnitId!;
      return measurementUnitId
    } else {
      return undefined
    }
  };

  const myWarehousesData = createWarehouseData(myWarehouses!);
  const allWarehousesData = createWarehouseData(filteredWarehouses!);
  const employeesData = createEmployeeData(employees!);
  const goodsData = createGoodsData(goods!);
  const myGoodsdata = createGoodsData(myGoods!);
  const allGoodsData = createAllGoodsData(allGoods!);
  const partnersData = createPartnersData(partners!);
  const cashRegistersData = creatCashRegistersData(cashRegisters!);

  return {
    myWarehousesData,
    allWarehousesData,
    employeesData,
    cashRegistersData,
    goodsData,
    allGoodsData,
    partnersData,
    myGoodsdata,
    warehouseDataTypes,
    myGoods,
    getRemainder,
    getGoodsUnitType,
    getAllGoodsUnitType,
    setMeasurementUnitId
  }
};

export const useWarehouseHooks = () => {
  const { control } = useForm<{ warehouse: IAutocompleteItem,type:IAutocompleteItem }>();
  return {
    control,
  }
};

export const useCashRegisterHooks = () => {
  const { control } = useForm<{ cashRegister: IAutocompleteItem }>();
  return {
    control,
  }
};


export const useGoodExitsHooks = ()=>{

}
