import { IActionCard } from "../../Interfaces/componentTypes";
import { BetweenStorages, Sales, OutFromStorage, IntoStorage, CashIncome, CashOut, CashChange, Users, StorageRemove, ReturnableImage, CompaniesImage } from '../../Assets/Images';
import { useAutocompleteData, useGeneralHooks } from "../../General/Hooks/hooks";
import { toast } from "react-toastify";

const useHomePageHooks = () => {
    const { t, navigate, currentUser } = useGeneralHooks();
    const { myWarehousesData, cashRegistersData } = useAutocompleteData()
    const getOPpionList = (id: number): IActionCard[] | [] => {
        switch (id) {
            case 1:
                return [
                    {
                        src: `${Users}`,
                        title: t('Actions.Users.Title'),
                        onClick: () => { navigate('/users') }
                    },
                    {
                        src: `${CompaniesImage}`,
                        title: t('Actions.Companies.Title'),
                        onClick: () => { navigate('/companies') }
                    },
                    {
                        src: `${ReturnableImage}`,
                        title: t('Actions.Returnable.Title'),
                        onClick: () => { navigate('/returnable') }
                    },
                ]
            case 2:
                return [
                    {
                        src: `${IntoStorage}`,
                        title: t('Actions.To_Storage.Title'),
                        onClick: () => {
                            if (myWarehousesData?.length! > 0) {
                                navigate('/storage_incomings')
                            } else {
                                toast.warning(t('Toast.Warning.No_Warehouse'))
                            }
                        }
                    },
                    {
                        src: `${OutFromStorage}`,
                        title: t('Actions.From_Storage.Title'),
                        onClick: () => {
                            if (myWarehousesData?.length! > 0) {
                                navigate('/storage_outgoings')
                            } else {
                                toast.warning(t('Toast.Warning.No_Warehouse'))
                            }
                        }
                    },
                    {
                        src: `${BetweenStorages}`,
                        title: t('Actions.Between_Storages.Title'),
                        onClick: () => {
                            if (myWarehousesData?.length! > 0) {
                                navigate('/storage_transfers')
                            } else {
                                toast.warning(t('Toast.Warning.No_Warehouse'))
                            }
                        }
                    },
                    {
                        src: `${Sales}`,
                        title: t('Actions.Sales.Title'),
                        onClick: () => {
                            if (myWarehousesData?.length! > 0) {
                                navigate('/sales')
                            } else {
                                toast.warning(t('Toast.Warning.No_Warehouse'))
                            }
                        }
                    },
                    {
                        src: `${CashIncome}`,
                        title: t('Actions.Cash_Income.Title'),
                        onClick: () => {
                            if (cashRegistersData?.length! > 0) {
                                navigate('/cash_incomings')
                            } else {
                                toast.warning(t('Toast.Warning.No_CashRegister'))
                            }
                        }
                    },
                    {
                        src: `${CashOut}`,
                        title: t('Actions.CashOut.Title'),
                        onClick: () => {
                            if (cashRegistersData?.length! > 0) {
                                navigate('/cashouts')
                            } else {
                                toast.warning(t('Toast.Warning.No_CashRegister'))
                            }

                        }
                    },
                    {
                        src: `${CashChange}`,
                        title: t('Actions.Cash_Changes.Title'),
                        onClick: () => {
                            if (cashRegistersData?.length! > 0) {
                                navigate('/cash_transfers')
                            } else {
                                toast.warning(t('Toast.Warning.No_CashRegister'))
                            }
                        }
                    },
                    {
                        src: `${StorageRemove}`,
                        title: t('Actions.Warehouse_Return.Title'),
                        onClick: () => { 
                            if (myWarehousesData?.length! > 0) {
                                navigate('/warehouse_returns')
                             }else{
                                toast.warning(t('Toast.Warning.No_Warehouse'))
                             }
                            }
                    },
                ]
            default:
                return [];
        }
    };

    const optionList = getOPpionList(currentUser.role_id!);

    return {
        optionList
    }
};

export default useHomePageHooks