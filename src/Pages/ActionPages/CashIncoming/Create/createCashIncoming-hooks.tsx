import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface ICachIncomingFormValues {
    date: string,
    cashBoxId: IAutocompleteItem,
    payer:IAutocompleteItem,
    amount: string,
    description?: string

}

const useCreateCashoutHooks = () => {
    const {cashBoxesData,payersData} = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();
    const { register, handleSubmit,  control, reset, formState: { errors } } = useForm<ICachIncomingFormValues>({mode:"all"});

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICachIncomingFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        cashBoxesData,
        payersData,
        control,
        errors,
    }
};

export default useCreateCashoutHooks