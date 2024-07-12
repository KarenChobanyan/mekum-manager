import { useCallback } from "react";
import { t } from 'i18next';
import { useGetReturnableProductsQuery } from "../../../API/actionsApi";
import { ITableBodyData,  ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { GetReturnableProductsResponse } from "../../../Interfaces/responseTypes";
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import styles from '../formTablestyles.module.scss';

export interface IReturnableProductRenderItem {
    material_value_id_out: string,
    material_value_id_in: string,
}

const useReturnableProductsHook = () => {
    const { data: returnableData } = useGetReturnableProductsQuery();
    const { goodsData, allGoodsData } = useAutocompleteData();
    const setProductName = useCallback((id: number) => {
        const product = allGoodsData?.filter((good) => good.id === String(id))[0];
        const name = product?.title
        return name
    }, [goodsData]);

    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Product_1')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Product_2')}`,
            contentType: TableCellContentTypes.SELECT
        },
    ];

    const createBodyData = (data: GetReturnableProductsResponse): Array<ITableBodyData> => {
        return data?.map((item) => {
            return {
                id: item.id,
                data: [
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{setProductName(item.material_value_id_out)}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                    {
                        component:
                            <div className={styles.formItemTextBox}>
                                <div className={styles.formItemText}>{setProductName(item.material_value_id_in)}</div>
                            </div>,
                        contentType: TableCellContentTypes.SELECT
                    },

                ]
            }
        })
    };

    const bodyData = createBodyData(returnableData!);

    return {
        returnableData,
        headerData,
        bodyData
    }
};

export default useReturnableProductsHook