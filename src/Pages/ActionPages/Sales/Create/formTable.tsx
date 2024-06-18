import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { t } from 'i18next';
import { ISalesFormValues } from './createSales-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, CustomTable, TotalExitsCounter } from '../../../../Components';
import { RedTrashIcon } from '../../../../Assets/Icons';
import styles from '../../formTablestyles.module.scss';

interface IProps {
    fields: FieldArrayWithId<ISalesFormValues, "goods", "id">[],
    remove: UseFieldArrayRemove,
    register: UseFormRegister<ISalesFormValues>,
    control: Control<ISalesFormValues, any>,
    errors: FieldErrors<ISalesFormValues>,
    id: string,
    onAddItem: () => void,
    setValue: UseFormSetValue<ISalesFormValues>,
    watch: UseFormWatch<ISalesFormValues>,
};



const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, register, control, errors, id, onAddItem, setValue, watch } = props;
    const { getGoodsUnitType, myGoodsdata, getRemainder } = useAutocompleteData(id!);

    const headerData: ITableHeader[] = [
        {
            title: "",
            contentType: TableCellContentTypes.ICON
        },
        {
            title: `${t('Forms.Material')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Point')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Remainder')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Count')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Discount')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.NUMBER
        }
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
                            name={`goods.${index}.materialValueId`}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocompleteBig'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={(value) => {
                                                const unit = getGoodsUnitType(value?.id!)
                                                const materialValueId = value?.id!
                                                if (materialValueId) {
                                                    setValue(`goods.${index}.quantity`, String(getRemainder(materialValueId!)))
                                                }
                                                setValue(`goods.${index}.point`, unit!)
                                                return onChange(value)
                                            }
                                            }
                                            id={name}
                                            data={myGoodsdata}
                                            placeholder={t('Forms.Select_Material')}
                                            showErrorText={false}
                                            style={styles.formItemBox}
                                            error={errors.goods?.[index]?.materialValueId}
                                        />
                                    </div>
                                );
                            }}
                        />,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.point`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            disabled
                            error={errors.goods?.[index]?.point}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.quantity`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            disabled
                            error={errors.goods?.[index]?.quantity}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`goods.${index}.count`}
                            rules={{ max: getRemainder(watch(`goods.${index}.materialValueId`)?.id!) }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <AuthInput
                                        register={register}
                                        registerName={`goods.${index}.count`}
                                        showTextError={false}
                                        type='number'
                                        inputStyle={styles.formItemInput}
                                        inputBoxStyles={styles.formItemInputNumBox}
                                        error={errors.goods?.[index]?.count}
                                    />
                                )
                            }
                            }
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.discount`}
                            showTextError={false}
                            type='number'
                            maxDate="100"
                            // onChange={(event) => {
                            //      const discount = +event.currentTarget.value;
                            //      const total = +watch(`goods.${index}.money`)
                            //      if(discount){
                            //         setValue(`goods.${index}.money`,String(total - ((total * discount) / 100)))
                            //      }
                            //     // const price = +watch(`goods.${index}.price`);
                            //     // const count = +watch(`goods.${index}.count`);
                            //     // if (price !== 0) {
                            //     //     const cost = String(price - ((price * discount) / 100));
                            //     //     setValue(`goods.${index}.cost`, cost);
                            //     //     if (count !== 0) {
                            //     //         const total = +cost * count;
                            //     //         setValue(`goods.${index}.money`, String(total));
                            //     //     }
                            //     // }
                            // }
                            // }
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            error={errors.goods?.[index]?.discount}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                <TotalExitsCounter
                                    warehouseId={id!}
                                    materialValueId={watch(`goods.${index}.materialValueId`)?.id!}
                                    count={watch(`goods.${index}.count`)}
                                    discount={watch(`goods.${index}.discount`)}
                                setValue={setValue}
                                index={index}
                                />
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.NUMBER
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

export default FormItems
