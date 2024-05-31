import { FieldPathValues, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";

export interface IStorageIncomeFormValues {
    date: string,
    storageId: IAutocompleteItem,
    supplierId: IAutocompleteItem,
    items: IStorageIncomeItem[]
}

export interface IStorageIncomeItem {
    title: string,
    unitId: string,
    price: string,
    count: string,
    cost: string
}

const useCreateStorageIncomeHooks = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<IStorageIncomeFormValues>();
    const onSubmit: SubmitHandler<IStorageIncomeFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        errors
    }
};

export default useCreateStorageIncomeHooks