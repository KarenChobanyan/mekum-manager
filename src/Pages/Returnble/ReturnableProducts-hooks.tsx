import { useForm } from "react-hook-form";
import { usePostReturnableMutation } from "../../API/actionsApi";
import { useAutocompleteData } from "../../General/Hooks/hooks";
import { IPostRPostReturnable } from "../../Interfaces/requestTypes";
import { useCallback, useEffect, useState } from "react";
import { IAutocompleteData } from "../../Interfaces/componentTypes";

const useReturnableProductsHooks = () => {
    const { register, handleSubmit, control, formState: { errors }, getValues, watch } = useForm()
    const { goodsData } = useAutocompleteData();
    const [returnable, {}] = usePostReturnableMutation();
    const [oneSelectData, setOneSelectData] = useState<IAutocompleteData | undefined>(undefined);
    const [secondSelectData, setSecondSelectData] = useState<IAutocompleteData | undefined>(goodsData);

    useEffect(() => {
        if(goodsData && oneSelectData == undefined) {
                setOneSelectData(goodsData)
                setSecondSelectData(goodsData)
        }
    },[goodsData])

    const onSubmit = (data: any) => {
        console.log(data,"DDDDDDDD");
        const payload:IPostRPostReturnable = {
            material_value_id_out:+data?.material_out?.id,
            material_value_id_in:+data?.material_in?.id,
          };
          console.log(payload,"pppppp");
          returnable(payload);       
    }

    // const f = useCallback(()=>{
    // //    const a = watch("material_out")?.id === goodsData?.filter((i:any)=>{i.id})
    //    const a = watch("material_out")?.id === watch("material_in")?.id     
    // },[])
  
    // useEffect(()=>{
    //   return  f()
    // },)
    
    useEffect(() => {
        if(watch("material_out")) {
            const newData = goodsData?.filter((item) => item.id !== watch("material_out").id);
            console.log(newData, "11111111111111111");
            setSecondSelectData(newData)    
        }
      if(watch("material_in")) {
            const newData = goodsData?.filter((item) => item.id !== watch("material_in").id);
            console.log(newData, "22222222222222222");
            setOneSelectData(newData)    
        }
        console.log(watch("material_out")?.id, "watch1");
        console.log(watch("material_in")?.id, "watch2");
    },[watch("material_out"),watch("material_in"),])

    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        goodsData,
        errors,
        getValues,
        oneSelectData,
        secondSelectData
    }
}

export default useReturnableProductsHooks;