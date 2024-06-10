import { useGetWarehouseEntriesQuery } from "../../../API/actionsApi";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { t } from 'i18next';
import styles from '../formTablestyles.module.scss'
import moment from "moment";
import { IWarehouseEntryResponse } from "../../../Interfaces/responseTypes";
import { useState } from "react";

const useStorageIncome = (id: string) => {
    const [activePage,setActivePage] = useState<number>(0);
    const { data: entryData } = useGetWarehouseEntriesQuery({ id: id!, limit: 7, offset: activePage });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.PartnerIn')}`,
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

    const createBodyData = (data: IWarehouseEntryResponse): Array<ITableFormItemData[]> => {
        return data?.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.documentDate).format("DD/MM/YYYY")}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.partners.name!}</div>
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
                            <div className={styles.formItemText}>{item?.warehouseEntryOrderProduct?.reduce((acc, current) => acc + current.money, 0)}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
            ]
        })
    };

    const bodyData = createBodyData(entryData!);

    return {
        headerData,
        entryData,
        bodyData,
        activePage,
        setActivePage
    }
};

export default useStorageIncome