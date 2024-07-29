import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IPostCashTransfer } from "../../../../Interfaces/requestTypes";
import { usePostCashTransferMutation } from "../../../../API/actionsApi";

export interface ICashTransferFormValues {
    date: string,
    exitCashRegisterId: IAutocompleteItem,
    balance:string,
    entryCashRegisterId: IAutocompleteItem,
    money: string,
    draft: string
};

const useCreateCashTransferHooks = (id:string) => {
    const { cashRegistersData, allCashRegistersData } = useAutocompleteData();
    const [add, { isLoading, isSuccess, isError }] = usePostCashTransferMutation();
    const { navigate, t } = useGeneralHooks();
    const {cashRegisters} = useDirectoriesHooks();
    const { register, handleSubmit, control, reset, watch,setValue, formState: { errors } } = useForm<ICashTransferFormValues>({ mode: "all" });

    useEffect(()=>{
        const currentCashRegister = cashRegisters?.result.filter((item)=>item.id === +id!)?.[0];
        setValue('balance',String(currentCashRegister?.code!))
      },[id]);

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