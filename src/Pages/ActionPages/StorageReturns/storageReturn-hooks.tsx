import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { useGeneralHooks } from "../../../General/Hooks/hooks";
import { useGetWarehouseReturnsQuery } from "../../../API/actionsApi";
import { WarehouseReturnsResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useStorageReturn = (id: string) => {
    const {renderDataLimit}= useGeneralHooks();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const { data: returnsData } = useGetWarehouseReturnsQuery({ id: id, limit: renderDataLimit, offset: offset });
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
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const createBodyData = (data: WarehouseReturnsResponse): Array<ITableBodyData> => {
        return data?.result!.map((item) => {
            return {
                id: item.id,
                data: [
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
                                <div className={styles.formItemText}>{item.partner?.name!}</div>
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
                ]
            }
        })
    };

    const bodyData = createBodyData(returnsData!);

    return {
        returnsData,
        headerData,
        bodyData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useStorageReturn