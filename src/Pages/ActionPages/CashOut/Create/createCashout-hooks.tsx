import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { usePostCashoutMutation } from "../../../../API/actionsApi";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

export interface ICashoutFormValues {
    date: string,
    cashRegisterId: IAutocompleteItem,
    money: string,
};

const useCreateCashoutHooks = (id: string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostCashoutMutation();
    const { navigate, t } = useGeneralHooks();
    const { cashRegistersData } = useAutocompleteData();
    const cashRegister = cashRegistersData?.filter((item) => item.id === id)[0];
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ICashoutFormValues>({ mode: "all" });

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

    const onSubmit: SubmitHandler<ICashoutFormValues | FieldValues> = (values) => {
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

export default useCreateCashoutHooks