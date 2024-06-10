import { useState } from 'react';
import {t} from 'i18next';
import moment from "moment";
import { useGetCashOutsQuery } from "../../../API/actionsApi";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { CashOutResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useCashOutHooks = (id: string) => {
    const [activePage,setActivePage] = useState<number>(0)
    const { data: cashoutsData } = useGetCashOutsQuery({ id: id, limit: 7, offset: activePage });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.TEXT
        }
    ];

    const createBodyData = (data: CashOutResponse): Array<ITableFormItemData[]> => {
        return data?.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.documentNumber!}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.amountCurrency1}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
            ]
        })
    };

    const bodyData = createBodyData(cashoutsData !);
    return {
        cashoutsData,
        bodyData,
        headerData,
        activePage,
        setActivePage
    }
};

export default useCashOutHooks