import { useForm } from "react-hook-form";

const useReturnableProductsHooks = () => {
    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm()
    const onSubmit = (data: any) => {
        console.log(data, "DATA");
    }
    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        getValues,
    }
}

export default useReturnableProductsHooks;