import { useForm } from "react-hook-form";

const useReturnableProductsHooks = () => {
    const { register, handleSubmit, control, formState: { errors }, getValues, watch } = useForm()
    const onSubmit = (data: any) => {
        console.log(data, "DATA");
    }
    console.log(watch("name1"), "watch");
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