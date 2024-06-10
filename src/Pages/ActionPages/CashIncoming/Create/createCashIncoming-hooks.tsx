import { useEffect } from "react";
import { toast } from "react-toastify";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { usePostCashEntryMutation } from "../../../../API/actionsApi";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

export interface ICachIncomingFormValues {
    date: string,
    cashRegisterId: IAutocompleteItem,
    money: string,
};

const useCreateCashEntryHooks = (id:string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostCashEntryMutation();
    const { navigate, t } = useGeneralHooks();
    const { cashRegistersData } = useAutocompleteData();
    const cashRegister = cashRegistersData?.filter((item) => item.id === id)[0];
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ICachIncomingFormValues>({ mode: "all" });

    useEffect(() => {
        setValue('cashRegisterId', cashRegister!)
    }, [cashRegister]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICachIncomingFormValues | FieldValues> = (values) => {
        const payload: ICashoutRequest = {
            date: values.date!,
            cashRegisterId: +(values.cashRegisterId as IAutocompleteItem).id,
            money: +values.money
        }
        add(payload)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        cashRegistersData,
        control,
        errors,
        isLoading,
    }
};

export default useCreateCashEntryHooks