import React from 'react';
import styles from './styles.module.scss';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
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
    onAddItem:()=>void
};

const headerData: string[] = [
    "",
    "Պահեստ",
    "Անվանում",
    "Միավոր",
    "Քանակ",
    "Գին",
    "Զեղչի տոկոս",
    "Գումար",
    "Արժեք",
];

const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, storageName, register, control,errors,unitData,onAddItem } = props;
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
                            // error={errors.date}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`items.${index}.unitId`}
                            rules={{
                                //   required: t('Input_Errors.Required'),
                            }}
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
                                             error={errors.storageId}
                                            style={styles.formItemInput}
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
                            // error={errors.date}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.price`}
                            showTextError={false}
                            type='number'
                            // error={errors.date}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.discount`}
                            showTextError={false}
                            type='number'
                            // error={errors.date}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.cost}</div>
                        </div>
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.total}</div>
                        </div>
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
