import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface IStorageTransferFormValues {
    date: string,
    outputStorageId: IAutocompleteItem,
    inputStorageId: IAutocompleteItem,
    items: IStorageTransferItem[]
}

export interface IStorageTransferItem {
    storageOutput?: string,
    storageInput?: string,
    title: string,
    unitId: IAutocompleteItem | null,
    price: string,
    count: string,
    discount: string
    cost: string,
    total: string
};

export interface IFormItemData {
    component: ReactNode
};


const useCreateStorageTransfersHooks = () => {
    const { unitData, warehousesData } = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();

    const [storageOutputName, setStorageOutputName] = useState<string>("");
    const [storageInputName, setStorageInputName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageTransferFormValues>({
        defaultValues: {
            items: [{ storageOutput: storageOutputName, storageInput: storageInputName, title: '', unitId: null, price: '', count: '', discount: "", cost: '', total: "" }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    useEffect(() => {
        const storageOutputName = watch('outputStorageId')?.title!;
        const storageInputName = watch('inputStorageId')?.title!;
        if (storageOutputName || storageInputName) {
            setStorageOutputName(storageOutputName)
            setStorageInputName(storageInputName)
        }
    }, [watch("outputStorageId"), watch("inputStorageId")]);


    const onAddItem = () => {
        append({ storageOutput: storageOutputName, storageInput: storageInputName, title: '', unitId: null, price: '', count: '', discount: "", cost: '', total: "" })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<IStorageTransferFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        remove,
        append,
        setValue,
        unitData,
        watch,
        control,
        errors,
        fields,
        storageOutputName,
        storageInputName,
        warehousesData,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageTransfersHooks