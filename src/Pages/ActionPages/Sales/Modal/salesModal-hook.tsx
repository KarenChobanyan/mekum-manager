import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { usePostCashEntryMutation } from "../../../../API/actionsApi";
import { ICachIncomingFormValues } from "../../CashIncoming/Create/createCashIncoming-hooks";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

const useSalesModal = (partner: IAutocompleteItem,handleClose:()=>void) => {
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ICachIncomingFormValues>({ mode: "all" });
    const { cashRegistersData } = useAutocompleteData();
    const { t, navigate } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostCashEntryMutation();

    useEffect(() => {
        setValue('partner', partner)
    }, [partner, setValue]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            handleClose()
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onSubmit: SubmitHandler<ICachIncomingFormValues | FieldValues> = async(values) => {
        try {
            const payload: ICashoutRequest = {
                date: moment(new Date()).format("YYYY-MM-DD"),
                cashRegisterId: +(values.cashRegisterId as IAutocompleteItem).id,
                partnersId: +(values.partner as IAutocompleteItem).id,
                money: +values.money
            }
            add(payload)
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
        
    };
    return {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        errors,
        onSubmit,
        cashRegistersData,
        t,
        isLoading
    }
};

export default useSalesModal