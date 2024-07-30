import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { usePostCashoutMutation } from "../../../../API/actionsApi";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

export interface ICashoutFormValues {
    date: string,
    cashRegisterId: string,
    balance:string,
    partner:IAutocompleteItem,
    money: string,
};

const useCreateCashoutHooks = (id: string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostCashoutMutation();
    const { navigate, t } = useGeneralHooks();
    const {cashRegisters} = useDirectoriesHooks();
    const { cashRegistersData,partnersData } = useAutocompleteData();
    const cashRegister = cashRegistersData?.filter((item) => item.id === id)[0];
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ICashoutFormValues>({ mode: "all" });

    useEffect(()=>{
        const currentCashRegister = cashRegisters?.result.filter((item)=>item.id === +id!)?.[0];
        setValue('balance',String(currentCashRegister?.code!))
      },[id]);

    useEffect(() => {
        setValue('cashRegisterId', cashRegister?.title!)
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
            date: moment(new Date()).format("YYYY-MM-DD"),
            cashRegisterId: +cashRegister?.id!,
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
        partnersData,
        control,
        errors,
        isLoading,
    }
};

export default useCreateCashoutHooks