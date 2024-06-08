import { useGetSalesQuery } from "../../../API/actionsApi";
import { t } from 'i18next';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { AccounInvoiceResponce } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss'
import moment from "moment";

const useSalesHooks = (id: string) => {
    const { data: salesData } = useGetSalesQuery({ id: id, limit: 10, offset: 0 });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Buyer')}`,
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

    const createBodyData = (data: AccounInvoiceResponce): Array<ITableFormItemData[]> => {
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
                            <div className={styles.formItemText}>{item.partner?.name!}</div>
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
                            <div className={styles.formItemText}>{item.accountInvoiceSpecification?.reduce((acc, current) => acc + (current.money * current.quantity), 0)}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
            ]
        })
    };

    const bodyData = createBodyData(salesData!);

    return {
        salesData,
        headerData,
        bodyData
    }
};

export default useSalesHooks