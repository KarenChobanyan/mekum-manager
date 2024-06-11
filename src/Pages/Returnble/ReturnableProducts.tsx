import { Controller } from "react-hook-form";
import useReturnableProductsHooks from "./ReturnableProducts-hooks";
import { ButtonTypes } from "../../Interfaces/componentTypes";
import { AutoComplete, Button } from "../../Components";
import { useAutocompleteData } from "../../General/Hooks/hooks";
import arow from "../../Assets/Icons/arrow-right.svg"
import styles from "./ReturnableProducts.module.scss"


const ReturnableProducts = () => {
    const {control, onSubmit, handleSubmit,errors,goodsData} = useReturnableProductsHooks();
    
    return (
        <div className={styles.returnableProducts}>
            <div className={`${styles.returnableProductsItem} retunableProducts`}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AutoComplete 
                    data={goodsData}
                    value={value}
                    onChange={onChange} 
                    placeholder="Products" 
                    style={styles.returnableProductsInput}
                    error={errors.name1}
                     />
                )}
                name='material_out'
            />
            <div className={styles.arow}><img  src={arow}/></div>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AutoComplete
                    data={goodsData} 
                    value={value} 
                    onChange={onChange} 
                    placeholder="Products" 
                    style={styles.returnableProductsInput}
                    error={errors.name2} />
                    
                )}
                name='material_in'
            />
            </div>
            <div className={styles.button}><Button onClick={handleSubmit(onSubmit)} type="submit" title="send" buttonType={ButtonTypes.Primery}/></div>
            
        </div>
    )
}

export default ReturnableProducts;