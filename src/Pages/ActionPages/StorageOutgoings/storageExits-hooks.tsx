import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { useGeneralHooks } from "../../../General/Hooks/hooks";
import { useGetWarehouseExitsQuery } from "../../../API/actionsApi"
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { WarehouseExitResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useStorageExits = (id: string) => {
    const {renderDataLimit} = useGeneralHooks();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const { data: exitsData } = useGetWarehouseExitsQuery({ id: id, limit: renderDataLimit, offset: offset });
    console.log(exitsData,'exitsData')
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Warehouse')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const createBodyData = (data: WarehouseExitResponse): Array<ITableBodyData> => {
        return data?.result!.map((item) => {
            return {
                id: item.id,
                data: [
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{item.warehouse?.name!}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
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
                                <div className={styles.formItemText}>{item.documentNumber!}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                ]
            }
        })
    };

    const bodyData = createBodyData(exitsData!);

    return {
        exitsData,
        headerData,
        bodyData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useStorageExits