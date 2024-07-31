import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { usePostCashEntryMutation } from "../../../../API/actionsApi";
import { useAutocompleteData, useGeneralHooks, usePartner } from "../../../../General/Hooks/hooks";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

interface ISalesCachEntryFormValues {
    date: string,
    cashRegisterId: IAutocompleteItem,
    partner: IAutocompleteItem,
    debt: string,
    money: string,
}

const useSalesModal = (partner: IAutocompleteItem, handleClose: () => void) => {
    const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm<ISalesCachEntryFormValues>({ mode: "all" });
    const { cashRegistersData } = useAutocompleteData();
    const { t, navigate } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostCashEntryMutation();
    const [warning, setWarning] = useState<string | null>(null);
    const { debt } = usePartner(partner?.id!);

    useEffect(() => {
        if (partner) {
            setValue('debt', String(debt?.money!))
        }
    }, [partner]);

    useEffect(() => {
        setValue('partner', partner)
    }, [partner, setValue]);

    useEffect(() => {
        if (+watch('money') > +watch('debt')) {
            setWarning(t('Input_Errors.Debt'))
        } else {
            setWarning(null)
        }
    }, [watch('debt'), watch('money')])

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

    const onSubmit: SubmitHandler<ISalesCachEntryFormValues | FieldValues> = async (values) => {
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
        isLoading,
        warning
    }
};

export default useSalesModal