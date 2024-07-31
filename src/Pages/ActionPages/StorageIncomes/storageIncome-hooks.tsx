import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { useGetWarehouseEntriesQuery } from "../../../API/actionsApi";
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { IWarehouseEntryResponse } from "../../../Interfaces/responseTypes";
import { useGeneralHooks } from "../../../General/Hooks/hooks";
import styles from '../formTablestyles.module.scss'

const useStorageIncome = (id: string) => {
    const {renderDataLimit} = useGeneralHooks();
    const [activePage, setActivePage] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);
    const { data: entryData } = useGetWarehouseEntriesQuery({ id: id!, limit: renderDataLimit, offset: offset });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.PartnerIn')}`,
            contentType: TableCellContentTypes.SELECT
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

    const createBodyData = (data: IWarehouseEntryResponse): Array<ITableBodyData> => {
        return data?.result!.map((item) => {
            return {
                id: item.id,
                data: [
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
                                <div className={`${styles.formItemText} ${styles.formItemBigText}  ${styles.salesPartner}`}>{item.partners.name!}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
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
            }
        })
    };

    const bodyData = createBodyData(entryData!);

    return {
        headerData,
        entryData,
        bodyData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useStorageIncome