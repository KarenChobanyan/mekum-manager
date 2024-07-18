import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { t } from 'i18next';
import { ISalesFormValues } from './createSales-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ITableBodyData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
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
    setSalePrice:(id:string)=>string
};



const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, register, control, errors, id, onAddItem, setValue, watch,setSalePrice } = props;
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
            title:  `${t('Forms.Price')}`,
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

    const createItemForm = (): Array<ITableBodyData> => {
        return fields.map((item, index) => {
            return {
                id:index,
                data:   [
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
                                                        setValue(`goods.${index}.price`,setSalePrice(materialValueId!))
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
                        name={`goods.${index}.price`}
                        rules={{
                            required:'',
                            validate:(value) => {
                                if (value === "") {
                                  return "This field is required.";
                                } else if (!/^\d+$/.test(value)) {
                                  return "Value must be a number.";
                                }
                                return true;
                              }
                            }}
                        render={({ field: { onChange, name, value } }) => {
                            return (
                                <AuthInput
                                register={register}
                                registerName={`goods.${index}.price`}
                                showTextError={false}
                                type='number'
                                inputStyle={styles.formItemInput}
                                patternValue={/^(?!0(\.0+)?$)\d+(\.\d+)?$/}
                                inputBoxStyles={styles.formItemInputNumBox}
                                required={true}
                                error={errors.goods?.[index]?.price}
                            />
                            )
                        }
                        }
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
                                            patternValue={/^(?!0(\.0+)?$)\d+(\.\d+)?$/}
                                            type='number'
                                            inputStyle={styles.formItemInput}
                                            required={true}
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
                                patternValue={/^(?!0(\.0+)?$)\d+(\.\d+)?$/}
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
                                        price={watch(`goods.${index}.price`)}
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
            }
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
