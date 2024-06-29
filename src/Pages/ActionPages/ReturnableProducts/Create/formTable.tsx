import React from 'react';
import { t } from 'i18next';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormWatch } from 'react-hook-form';
import { IReturnableProductsForm } from './createReturnableProducts-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
import { AutoComplete, CustomTable } from '../../../../Components';
import { RedTrashIcon } from '../../../../Assets/Icons';
import styles from '../../formTablestyles.module.scss';

interface IProps {
    fields: FieldArrayWithId<IReturnableProductsForm, "products", "id">[],
    remove: UseFieldArrayRemove,
    control: Control<IReturnableProductsForm, any>,
    errors: FieldErrors<IReturnableProductsForm>,
    onAddItem: () => void,
    watch: UseFormWatch<IReturnableProductsForm>,
};

const FormTable: React.FC<IProps> = (props) => {
    const { fields, remove, control, errors, onAddItem, watch } = props;
    const { allGoodsData } = useAutocompleteData();

    const headerData: ITableHeader[] = [
        {
            title: "",
            contentType: TableCellContentTypes.ICON
        },
        {
            title: `${t('Forms.Product_1')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Product_2')}`,
            contentType: TableCellContentTypes.SELECT
        },
    ];

    const createItemForm = (): Array<ITableFormItemData[]> => {
        return fields.map((item, index): ITableFormItemData[] => {
            return [
                {
                    component: <img src={RedTrashIcon} alt="redTrash" onClick={() => remove(index)} className={styles.deleteIcon} />,
                    contentType: TableCellContentTypes.ICON
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`products.${index}.material_value_id_out`}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocompleteBig'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={onChange}
                                            id={name}
                                            data={watch(`products.${index}.material_value_id_in`) ?
                                                allGoodsData?.filter((item) => item.id !== watch(`products.${index}.material_value_id_in`)?.id!)
                                                :
                                                allGoodsData
                                            }
                                            placeholder={t('Forms.Select_Material')}
                                            showErrorText={false}
                                            style={styles.formItemBox}
                                            error={errors.products?.[index]?.material_value_id_out}
                                        />
                                    </div>
                                );
                            }}
                        />,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`products.${index}.material_value_id_in`}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocompleteBig'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={onChange}
                                            id={name}
                                            data={watch(`products.${index}.material_value_id_out`) ?
                                                allGoodsData?.filter((item) => item.id !== watch(`products.${index}.material_value_id_out`)?.id!)
                                                :
                                                allGoodsData
                                            }
                                            placeholder={t('Forms.Select_Material')}
                                            showErrorText={false}
                                            style={styles.formItemBox}
                                            error={errors.products?.[index]?.material_value_id_in}
                                        />
                                    </div>
                                );
                            }}
                        />,
                    contentType: TableCellContentTypes.SELECT
                },
            ]
        })
    };

    const bodyData = createItemForm();

    return (
        <>
            <CustomTable
                headerData={headerData}
                bodyData={bodyData}
                addAction={onAddItem}
            />
        </>
    )
}

export default FormTable
