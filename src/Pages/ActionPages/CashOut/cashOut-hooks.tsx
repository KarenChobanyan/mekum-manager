import { useState } from 'react';
import { t } from 'i18next';
import moment from "moment";
import { useGetCashOutsQuery } from "../../../API/actionsApi";
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { CashOutResponse } from "../../../Interfaces/responseTypes";
import { useAutocompleteData, useGeneralHooks } from '../../../General/Hooks/hooks';
import styles from '../formTablestyles.module.scss';

const useCashOutHooks = (id: string) => {
    const {renderDataLimit} = useGeneralHooks();
    const [activePage, setActivePage] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0)
    const { data: cashoutsData } = useGetCashOutsQuery({ id: id, limit: renderDataLimit, offset: offset });
    const { partnersData } = useAutocompleteData();
    const setPartnerName = (id: string) => {
        const partner = partnersData?.filter((item) => item.id === id)?.[0];
        return partner?.title
    };
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Partner')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.NUMBER
        }
    ];

    const createBodyData = (data: CashOutResponse): Array<ITableBodyData> => {
        return data?.result!.map((item) => {
            return {
                id: item.id,
                data: [
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                            </div>,
                        contentType: TableCellContentTypes.NUMBER
                    },
                    {
                        component:
                            <div className={`${styles.formItemTextBox}`}>
                                <div className={`${styles.formItemText} ${styles.salesPartner}`}>{setPartnerName(String(item.partnersId))}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{item.documentNumber!}</div>
                            </div>,
                        contentType: TableCellContentTypes.NUMBER
                    },
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{item.amountCurrency1}</div>
                            </div>,
                        contentType: TableCellContentTypes.NUMBER
                    },
                ]
            }
        })
    };

    const bodyData = createBodyData(cashoutsData!);
    return {
        cashoutsData,
        bodyData,
        headerData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useCashOutHooks