import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IPostCashTransfer } from "../../../../Interfaces/requestTypes";
import { usePostCashTransferMutation } from "../../../../API/actionsApi";

export interface ICashTransferFormValues {
    date: string,
    exitCashRegisterId: IAutocompleteItem,
    entryCashRegisterId: IAutocompleteItem,
    money: string,
    draft: string
};

const useCreateCashTransferHooks = () => {
    const { cashRegistersData, allCashRegistersData } = useAutocompleteData();
    const [add, { isLoading, isSuccess, isError }] = usePostCashTransferMutation();
    const { navigate, t } = useGeneralHooks();
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ICashTransferFormValues>({ mode: "all" });


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

    const onSubmit: SubmitHandler<ICashTransferFormValues | FieldValues> = (values) => {
        const payload: IPostCashTransfer = {
            exitCashRegisterId: +(values.exitCashRegisterId as IAutocompleteItem).id,
            entryCashRegisterId: +(values.entryCashRegisterId as IAutocompleteItem).id,
            money: +values.money,
            draft: false
        }
        add(payload)
       };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        watch,
        cashRegistersData,
        allCashRegistersData,
        control,
        errors,
        isLoading,
    }
};

export default useCreateCashTransferHooks