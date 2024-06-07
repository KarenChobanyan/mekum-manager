import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IGoodBatch } from "../../../../Interfaces/responseTypes";

export interface IStorageOutgoingFormValues {
    documentDate: string,
    warehouseId: IAutocompleteItem,
    partnersId: IAutocompleteItem,
    goods: IStorageOutgoingItem[]
}

export interface IStorageOutgoingItem {
    materialValueId: IAutocompleteItem | null,
    point: string,
    quantity: string,
    count: string,
    money: string,
    exits:IGoodBatch[] | []
};


const useCreateStorageOutgoingHooks = (id: string) => {
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { navigate } = useGeneralHooks();

    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageOutgoingFormValues>({
        defaultValues: {
            goods: [{ materialValueId: null, quantity: '', point: '', count: '',  money: "",exits:[] }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });


    useEffect(() => {
        setValue('warehouseId', warehouse!)
    }, [warehouse]);


    const onAddItem = () => {
        append({ materialValueId: null, quantity: '', point: '',  count: '', money: "",exits:[] })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<IStorageOutgoingFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        remove,
        append,
        setValue,
        watch,
        control,
        errors,
        fields,
        onAddItem,
        onCencele,
    }
};

export default useCreateStorageOutgoingHooks