import { useForm } from "react-hook-form";
import { usePostReturnableMutation } from "../../API/actionsApi";
import { useAutocompleteData } from "../../General/Hooks/hooks";
import { IPostRPostReturnable } from "../../Interfaces/requestTypes";
import { useCallback, useEffect } from "react";

const useReturnableProductsHooks = () => {
    const { register, handleSubmit, control, formState: { errors }, getValues, watch } = useForm()
    const { goodsData } = useAutocompleteData();
    const [returnable, {}] = usePostReturnableMutation();

    const onSubmit = (data: any) => {
        console.log(data,"DDDDDDDD");
        const payload:IPostRPostReturnable = {
            material_value_id_out:+data?.material_out?.id,
            material_value_id_in:+data?.material_in?.id,
          };
          console.log(payload,"pppppp");
          returnable(payload);       
    }

    const f = useCallback(()=>{
    //    const a = watch("material_out")?.id === goodsData?.filter((i:any)=>{i.id})
       const a = watch("material_out")?.id === watch("material_in")?.id     
    },[])
  
    useEffect(()=>{
      return  f()
    },)
    console.log(watch("material_out")?.id, "watch1");
    console.log(watch("material_in")?.id, "watch2");
    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        goodsData,
        errors,
        getValues,
    }
}

export default useReturnableProductsHooks;