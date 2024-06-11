import { IActionCard } from "../../Interfaces/componentTypes";
import { BetweenStorages, Sales, OutFromStorage, IntoStorage, CashIncome, CashOut, CashChange, Users, StorageRemove } from '../../Assets/Images';
import { useGeneralHooks } from "../../General/Hooks/hooks";
import { IGetMeResponseData } from "../../Interfaces/responseTypes";

const useHomePageHooks = () => {
    const { t, navigate,currentUser } = useGeneralHooks();
    const getOPpionList = (id: number): IActionCard[] | [] => {
        switch (id) {
            case 1:
                return [
                    {
                        src: `${Users}`,
                        title: t('Actions.Users.Title'),
                        onClick: () => { navigate('/users') }
                    },
                ]
            case 2:
                return [
                    {
                        src: `${IntoStorage}`,
                        title: t('Actions.To_Storage.Title'),
                        onClick: () => { navigate('/storage_incomings') }
                    },
                    {
                        src: `${OutFromStorage}`,
                        title: t('Actions.From_Storage.Title'),
                        onClick: () => { navigate('/storage_outgoings') }
                    },
                    {
                        src: `${BetweenStorages}`,
                        title: t('Actions.Between_Storages.Title'),
                        onClick: () => { navigate('/storage_transfers/create') }
                    },
                    {
                        src: `${Sales}`,
                        title: t('Actions.Sales.Title'),
                        onClick: () => { navigate('/sales') }
                    },
                    {
                        src: `${CashIncome}`,
                        title: t('Actions.Cash_Income.Title'),
                        onClick: () => { navigate('/cash_incomings') }
                    },
                    {
                        src: `${CashOut}`,
                        title: t('Actions.CashOut.Title'),
                        onClick: () => { navigate('/cashouts') }
                    },
                    {
                        src: `${CashChange}`,
                        title: t('Actions.Cash_Changes.Title'),
                        onClick: () => { navigate('/cash_transfers') }
                    },
                    {
                        src: `${StorageRemove}`,
                        title: t('Actions.Warehouse_Return.Title'),
                        onClick: () => { navigate('/warehouse_returns') }
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