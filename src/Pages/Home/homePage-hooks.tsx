import { IActionCard } from "../../Interfaces/componentTypes";
import {t} from 'i18next';
import { BetweenStorages, Sales, OutFromStorage, IntoStorage,CashIncome,CashOut,CashChange,Users } from '../../Assets/Images';

const useHomePageHooks = (roleId:number) => {
    const getOPpionList = (id: number): IActionCard[] | [] => {
        switch (id) {
            case 1:
                return [
                    {
                        src: `${IntoStorage}`,
                        title: t('Actions.To_Storage.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${OutFromStorage}`,
                        title: t('Actions.From_Storage.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${BetweenStorages}`,
                        title: t('Actions.Between_Storages.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${Sales}`,
                        title: t('Actions.Sales.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${CashIncome}`,
                        title: t('Actions.Cash_Income.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${CashOut}`,
                        title: t('Actions.CashOut.Title'),
                        onClick: () => { }
                    },
                    {
                        src: `${CashChange}`,
                        title: t('Actions.Cash_Changes.Title'),
                        onClick: () => { }
                    },
                ]
                case 2:
                    return [
                        {
                            src: `${Users}`,
                            title: t('Actions.Users.Title'),
                            onClick: () => { }
                        },
                    ]
            default:
              return  [];
        }
    };

    const optionList = getOPpionList(roleId);

    return {
        optionList
    }
};

export default useHomePageHooks