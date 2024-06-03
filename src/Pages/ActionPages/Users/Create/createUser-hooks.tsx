import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useRegisterMutation } from "../../../../API/authApi";
import { useEffect } from "react";

export interface IRegisterFormValues {
    role: IAutocompleteItem,
    name: string,
    surename: string,
    username: string,
    password: string,
    mekumId?: string
};

const useCreateUserHooks = () => {
    const { navigate, t } = useGeneralHooks();
    const { roles } = useDirectoriesHooks();
    const [registrate, { isLoading, isSuccess,isError }] = useRegisterMutation();
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<IRegisterFormValues>({ mode: "all" });

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        }else if(isError){
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess,isError]);

    const onSubmit: SubmitHandler<IRegisterFormValues | FieldValues> = (values) => {
        const payload: IRegisterFormValues = {
            role: values.role.id,
            name: values.name,
            surename: values.surename,
            username: values.username,
            password: values.password,
            mekumId: values.mekumId
        };
        registrate(payload);
    };

    return {
        handleSubmit,
        onCencele,
        register,
        onSubmit,
        roles,
        errors,
        control,
        isLoading,
    }
};

export default useCreateUserHooks