import { useState } from 'react';
import {t} from 'i18next';
import moment from "moment";
import { useGetCashEntryQuery } from "../../../API/actionsApi";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { CashOutResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';
import { useAutocompleteData } from '../../../General/Hooks/hooks';

const useCashEntryHooks = (id: string) => {
    const [activePage,setActivePage] = useState<number>(1);
    const [offset,setOffset] =  useState<number>(0);
    const {partnersData} = useAutocompleteData();
    const { data: cashEntryData } = useGetCashEntryQuery({ id: id, limit: 7, offset: offset });
    const setPartnerName = (id:string)=>{
        const partner = partnersData?.filter((item)=>item.id === id)?.[0];
        return partner?.title
    };
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Partner')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const createBodyData = (data: CashOutResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{setPartnerName(String(item.partnersId))}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.documentNumber!}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.amountCurrency1}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
            ]
        })
    };

    const bodyData = createBodyData(cashEntryData!);
    return {
        cashEntryData,
        bodyData,
        headerData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useCashEntryHooks