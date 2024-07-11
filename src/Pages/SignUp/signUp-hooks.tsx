import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useGeneralHooks } from "../../General/Hooks/hooks";
import { ILoginFormValues, ISignUpFormValues } from "../../Interfaces/interfaces";
import { useEffect } from "react";
import { getMe } from "../../Store/Slices/authSlice";

const useSignUpHooks = ()=>{
    const { accessToken, navigate, t,dispatch } = useGeneralHooks();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ISignUpFormValues>();
    const onSubmit: SubmitHandler<ISignUpFormValues | FieldValues> = (values) => {
      console.log(values)
    };

    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
    }
};

export default useSignUpHooks