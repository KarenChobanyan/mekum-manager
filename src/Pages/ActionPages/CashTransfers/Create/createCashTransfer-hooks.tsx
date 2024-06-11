import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface ICashTransferFormValues {
    date: string,
    cashBoxFromId: IAutocompleteItem,
    cashBoxInId: IAutocompleteItem,
    amount: string,
    description:string
};

const useCreateCashTransferHooks = () => {
    const { cashRegistersData } = useAutocompleteData();
    const { navigate } = useGeneralHooks();
    const { register, handleSubmit,  control, reset, formState: { errors } } = useForm<ICashTransferFormValues>({mode:"all"});

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICashTransferFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        cashRegistersData,
        control,
        errors,
    }
};

export default useCreateCashTransferHooks