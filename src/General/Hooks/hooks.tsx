import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { t } from 'i18next'
import moment from "moment";
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";
import { IAutocompleteData, IAutocompleteItem } from "../../Interfaces/componentTypes";
import { useGetAllCashRegistersQuery, useGetAllGoodsQuery, useGetAllWarehousesQuery, useGetCashRegistersQuery, useGetEmployeesQuery, useGetGoodsQuery, useGetPartnersQuery, useGetWarehouseGoodsQuery, useGetWarehousesQuery } from "../../API/direcroriesApi";
import { AllGoodsResponse, CashRegistersResponse, GetEmployeesResponseData, GetWarehousesResponseData, GoodsResponseData, IGetPartnersRespData, } from "../../Interfaces/responseTypes";
import { removeCurrentUser } from "../../Store/Slices/authSlice";
import { ISIN } from "../../Interfaces/interfaces";
import { useGetCashBalanceQuery, useGetPartnerDebtQuery } from "../../API/actionsApi";

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

  if (!currentUser) {
    localStorage.removeItem("mm_access_token");
  };
  const formatDate = (date: Date) => {
    return moment(date).format("DD.MM.YYYY");
  };
  const mobileScreen: boolean = window.innerWidth < 480;
  const mediumScreen: boolean = window.innerWidth < 680;
  const largeScreen: boolean = window.innerWidth > 920;
  const renderDataLimit = largeScreen ? 7 : 15;

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
    renderDataLimit,
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
  const { data: cashRegisters } = useGetCashRegistersQuery();
  const { data: allCashRegisters } = useGetAllCashRegistersQuery();
  const partners = partnersResponse?.result!;
  const roles: IAutocompleteItem[] = [
    { id: "1", title: t('Roles.Admin') },
    { id: "2", title: t('Roles.User') }
  ];

  return {
    myWarehouses,
    allWarehouses,
    partners,
    cashRegisters,
    allCashRegisters,
    roles,
    goods,
    allGoods,
    employees
  }
};

export const useAutocompleteData = (warehouseId?: string) => {
  const { employees, myWarehouses, allWarehouses, goods, allGoods, partners, cashRegisters, allCashRegisters } = useDirectoriesHooks();
  const { data: myGoods } = useGetWarehouseGoodsQuery(warehouseId!);
  const myWarehousesIds = myWarehouses?.map((item) => item.id);
  const filteredWarehouses = allWarehouses?.filter((item) => !myWarehousesIds?.includes(item.id));
  const warehouseDataTypes: IAutocompleteData = [
    {
      title: t('Forms.In'),
      id: ISIN.TRUE
    },
    {
      title: t('Forms.Out'),
      id: ISIN.FALSE
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
      return data.result!.map((item) => {
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
      return data.result!.map((item) => {
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
    if (goods?.length! > 0) {
      try {
        const unit = goods?.filter((item) => +id === item.materialValueId)?.[0].point;
        return unit
      } catch (error) {
        return 'անհայտ'
      }
    } else {
      return ""
    }
  }, [goods]);

  const getAllGoodsUnitType = useCallback((id: string) => {
    if (allGoods?.result.length) {
      const unit = allGoods?.result!.filter((item) => +id === item.id)[0].measurementUnit.unit;
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
      const good = allGoods?.result!.filter((item) => item.id === +id)
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
  const allCashRegistersData = creatCashRegistersData(allCashRegisters!);

  return {
    myWarehousesData,
    allWarehousesData,
    allCashRegistersData,
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
  const { control } = useForm<{ warehouse: IAutocompleteItem, type: IAutocompleteItem }>();
  return {
    control,
  }
};

export const useCashRegisterHooks = (id:string | undefined) => {
  const { control,register,setValue,reset } = useForm<{ cashRegister: IAutocompleteItem, type: IAutocompleteItem,balance:string }>();
  const {data:balanceData} = useGetCashBalanceQuery(id!,{skip:id === undefined});

  return {
    balanceData,
    control,
    register,
    setValue,
    reset
  }
};

export const useGoodExitsHooks = () => {

};

export const usePartner = (id:string)=>{
  const {data:debt} = useGetPartnerDebtQuery(id!,{skip:id === undefined});
  
    return {
      debt
    }
};

