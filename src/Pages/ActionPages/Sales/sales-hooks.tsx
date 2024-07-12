import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { useGetSalesQuery } from "../../../API/actionsApi";
import { ITableBodyData, ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { AccounInvoiceResponce } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss'

const useSalesHooks = (id: string) => {
    const [offset, setOffset] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1)
    const { data: salesData } = useGetSalesQuery({ id: id, limit: 7, offset: offset });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Buyer')}`,
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

    const createBodyData = (data: AccounInvoiceResponce): Array<ITableBodyData> => {
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
                            <div className={`${styles.formItemTextBox} ${styles.salesPartner}`} >
                                <div className={styles.formItemText}>{item.partner?.name!}</div>
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
                                <div className={styles.formItemText}>{item.accountInvoiceProduct?.reduce((acc, current) => acc + (current.money), 0)}</div>
                            </div>,
                        contentType: TableCellContentTypes.NUMBER
                    },
                ]
            }
        })
    };

    const bodyData = createBodyData(salesData!);
    return {
        salesData,
        headerData,
        bodyData,
        offset,
        setOffset,
        activePage,
        setActivePage
    }
};

export default useSalesHooks