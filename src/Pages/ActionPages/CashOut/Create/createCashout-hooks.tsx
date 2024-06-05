import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface ICashoutFormValues {
    date: string,
    cashBoxId: IAutocompleteItem,
    recipientId: IAutocompleteItem,
    amount: string,
    description:string
};

const useCreateCashoutHooks = () => {
    const {cashBoxesData} = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();
    const { register, handleSubmit,  control, reset, formState: { errors } } = useForm<ICashoutFormValues>({mode:"all"});

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICashoutFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        cashBoxesData,
        control,
        errors,
    }
};

export default useCreateCashoutHooks