import React from 'react';
import styles from './styles.module.scss';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IFormItemData, IStorageIncomeFormValues } from './createSrorageIncome-hooks';
import { RedTrashIcon } from '../../../../Assets/Icons';
import { AuthInput, AutoComplete, CustomTable } from '../../../../Components';
import { IAutocompleteItem } from '../../../../Interfaces/componentTypes';

interface IProps {
    fields: FieldArrayWithId<IStorageIncomeFormValues, "items", "id">[],
    remove: UseFieldArrayRemove,
    storageName: string,
    register: UseFormRegister<IStorageIncomeFormValues>,
    control: Control<IStorageIncomeFormValues, any>,
    errors: FieldErrors<IStorageIncomeFormValues>,
    unitData: IAutocompleteItem[],
    onAddItem: () => void,
    setValue: UseFormSetValue<IStorageIncomeFormValues>,
    watch: UseFormWatch<IStorageIncomeFormValues>
};

const headerData: string[] = [
    "",
    "Պահեստ",
    "Անվանում",
    "Միավոր",
    "Քանակ",
    "Գին",
    "Զեղչի տոկոս",
    "Արժեք",
    "Գումար",
];

const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, storageName, register, control, errors, unitData, onAddItem, setValue, watch } = props;
    const createItemForm = (): Array<IFormItemData[]> => {
        return fields.map((item, index): IFormItemData[] => {
            return [
                {
                    component: <img src={RedTrashIcon} alt="redTrash" onClick={() => remove(index)} className={styles.deleteIcon} />
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{storageName}</div>
                        </div>
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.title`}
                            showTextError={false}
                            error={errors.items?.[index]?.title}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`items.${index}.unitId`}
                            rules={{required:true}}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocomplete'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={onChange}
                                            id={name}
                                            data={unitData}
                                            placeholder="Ընտրեք միավորը"
                                            showErrorText={false}
                                            error={errors.items?.[index]?.unitId}
                                            style={styles.formItemBox}
                                        />
                                    </div>
                                );
                            }}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.count`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +event.currentTarget.value;
                                const cost = +watch(`items.${index}.cost`);
                                if (cost !== 0) {
                                    const total = String((cost * count));
                                    setValue(`items.${index}.total`, total);
                                }
                            }
                            }
                            error={errors.items?.[index]?.count}
                            inputStyle={styles.formItemInput}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.price`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +watch(`items.${index}.count`);
                                const price = +event.currentTarget.value;
                                const discount =  +watch(`items.${index}.discount`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`items.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count
                                        setValue(`items.${index}.total`, String(total))
                                    }
                                } else {
                                    setValue(`items.${index}.cost`, "");
                                }
                            }}
                             error={errors.items?.[index]?.price}
                            inputStyle={styles.formItemInput}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.discount`}
                            showTextError={false}
                            type='number'
                            maxDate="100"
                            onChange={(event) => {
                                const discount = +event.currentTarget.value;
                                const price = +watch(`items.${index}.price`);
                                const count = +watch(`items.${index}.count`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`items.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count;
                                        setValue(`items.${index}.total`, String(total));
                                    }
                                }
                            }
                            }
                            error={errors.items?.[index]?.discount}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.cost`}
                            showTextError={false}
                            disabled
                            type='number'
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.total`}
                            showTextError={false}
                            disabled
                            type='number'
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
            ]
        })
    };

    const items = createItemForm();

    return (
        <>
            <CustomTable
                headerData={headerData}
                bodyData={items}
                addAction={onAddItem}
            />
        </>
    )
}

export default FormItems
