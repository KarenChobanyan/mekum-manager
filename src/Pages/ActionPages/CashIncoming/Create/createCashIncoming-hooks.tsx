import { useEffect } from "react";
import { toast } from "react-toastify";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { usePostCashEntryMutation } from "../../../../API/actionsApi";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

export interface ICachIncomingFormValues {
    date: string,
    cashRegisterId: IAutocompleteItem,
    partner:IAutocompleteItem,
    debt:string,
    money: string,
};

const useCreateCashEntryHooks = (id:string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostCashEntryMutation();
    const { navigate, t } = useGeneralHooks();
    const { cashRegistersData,partnersData } = useAutocompleteData();
    const {partners} = useDirectoriesHooks();
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

    const setPartnerDebt = (partnerId:string)=>{
        const currentPartner = partners.filter((item)=>item.id === + partnerId)?.[0];
        setValue('debt',String(currentPartner.code!))
    };

    const onSubmit: SubmitHandler<ICachIncomingFormValues | FieldValues> = (values) => {
        const payload: ICashoutRequest = {
            date: moment(new Date()).format("YYYY-MM-DD"),
            cashRegisterId: +(values.cashRegisterId as IAutocompleteItem).id,
            partnersId:+(values.partner as IAutocompleteItem).id,
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
        setPartnerDebt,
        partnersData,
    }
};

export default useCreateCashEntryHooks