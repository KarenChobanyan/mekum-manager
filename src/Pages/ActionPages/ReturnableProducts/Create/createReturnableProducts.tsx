import React from 'react';
import {t} from 'i18next';
import useReturnableProducts from './createReturnableProducts-hooks';
import { Button, Loading } from '../../../../Components';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormTable from './formTable';
import styles from '../../formTablestyles.module.scss';

const CreateReturnableProducts:React.FC = () => {
const {isLoading,handleSubmit,onSubmit,onCancel,control,errors,fields,onAddItem,remove,watch} = useReturnableProducts();

  return (
    <div className={styles.container} >
      <div className={styles.body}>
        {
          isLoading
            ?
            <Loading />
            :
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
              <div className={styles.itemsBox}>
                <FormTable
                  control={control}
                  fields={fields}
                  remove={remove}
                  errors={errors}
                  onAddItem={onAddItem}
                  watch={watch}
                />
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.buttons}>
                  <Button
                    type='button'
                    onClick={onCancel}
                    buttonType={ButtonTypes.Primery}
                    title={t('Button.Cancel')}
                    buttonStyle={styles.button}
                  />
                  <Button
                    type='submit'
                    buttonType={ButtonTypes.Primery}
                    title={t('Button.Submit')}
                    buttonStyle={styles.button}
                  />
                </div>
              </div>
            </form>
        }
       </div>
    </div>
  )
}

export default CreateReturnableProducts
