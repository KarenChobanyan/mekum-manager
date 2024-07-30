import { useState } from 'react';
import { t } from 'i18next';
import moment from "moment";
import { useGetCashEntryQuery } from "../../../API/actionsApi";
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { CashOutResponse } from "../../../Interfaces/responseTypes";
import { useAutocompleteData, useGeneralHooks } from '../../../General/Hooks/hooks';
import styles from '../formTablestyles.module.scss';

const useCashEntryHooks = (id: string) => {
    const {renderDataLimit} = useGeneralHooks();
    const [activePage, setActivePage] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);
    const { partnersData } = useAutocompleteData();
    const { data: cashEntryData } = useGetCashEntryQuery({ id: id, limit: renderDataLimit, offset: offset });
    
    const setPartnerName = (id: string) => {
        const partner = partnersData?.filter((item) => item.id === id)?.[0];
        return partner?.title
    };
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Partner')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.TEXT
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
                        contentType: TableCellContentTypes.TEXT
                    },
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={`${styles.formItemText} ${styles.salesPartner}`}>{setPartnerName(String(item.partnersId))}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{item.amountCurrency1}</div>
                            </div>,
                        contentType: TableCellContentTypes.TEXT
                    },
                ]
            }

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