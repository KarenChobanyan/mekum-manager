import { useGetReturnableProductsQuery } from "../../../API/actionsApi";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { t } from 'i18next';
import { GetReturnableProductsResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss'
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import { useCallback } from "react";

export interface IReturnableProductRenderItem {
    material_value_id_out:string,
    material_value_id_in:string,
}

const useReturnableProductsHook = () => {
    const { data: returnableData } = useGetReturnableProductsQuery();
    const { goodsData } = useAutocompleteData();
    const setProductName = useCallback((id:number) => {
        const product = goodsData?.filter((good)=>good.id === String(id))[0];
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

    const createBodyData = (data: GetReturnableProductsResponse): Array<ITableFormItemData[]> => {
        return data?.map((item) => {
            return [
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