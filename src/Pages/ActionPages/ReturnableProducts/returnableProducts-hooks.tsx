import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGeneralHooks } from "../../../General/Hooks/hooks";
import { usePostReturnableMutation } from "../../../API/actionsApi";
import { IAutocompleteItem } from "../../../Interfaces/componentTypes";
import { IPostReturnable, PostRetunableRequestData } from "../../../Interfaces/requestTypes";

export interface IReturnableProductsForm {
    products: IProducts[]
};

export interface IProducts {
    material_value_id_out: IAutocompleteItem | null,
    material_value_id_in: IAutocompleteItem | null
};

const useReturnableProducts = () => {
    const { navigate, t } = useGeneralHooks();
    const [add, { isLoading, isError, isSuccess }] = usePostReturnableMutation();
    const { handleSubmit, control, formState: { errors }, watch, reset } = useForm<IReturnableProductsForm>({
        defaultValues: {
            products: [{ material_value_id_out: null, material_value_id_in: null }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products'
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onAddItem = () => {
        append({ material_value_id_out: null, material_value_id_in: null })
    };


    const onCancel = () => {
        navigate(-1)
    };

    const onSubmit: SubmitHandler<IReturnableProductsForm> = (values) => {
        const payload: PostRetunableRequestData = values.products?.map((item): IPostReturnable => {
            return {
                material_value_id_in: +(item.material_value_id_in!),
                material_value_id_out: +(item.material_value_id_out!)
            };
        })
        add(payload)
    };

    return {
        isLoading,
        handleSubmit,
        onSubmit,
        onCancel,
        remove,
        onAddItem,
        fields,
        control,
        errors,
        watch
    }
};

export default useReturnableProducts