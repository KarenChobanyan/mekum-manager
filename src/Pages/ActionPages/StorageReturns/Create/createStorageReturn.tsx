import React from 'react'
import { useParams } from 'react-router';
import useCreateStorageReturnHooks from './createStorageReturn-hooks';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import styles from '../../formTablestyles.module.scss';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';


const CreateStorageReturn:React.FC = () => {
    const { id } = useParams();
    const { register, control, errors, fields, isLoading, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, watch } = useCreateStorageReturnHooks(id!);
    const { t } = useGeneralHooks();
    const { myWarehousesData, partnersData } = useAutocompleteData()
  
    return (
      <div className={styles.container} >
        <div className={styles.body}>
          {
            isLoading
              ?
              <Loading />
              :
              <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                <div className={styles.form}>
                  <AuthInput
                    register={register}
                    registerName='documentDate'
                    label={t('Forms.Date')}
                    style={styles.inputRow}
                    inputStyle={styles.input}
                    inputBoxStyles={styles.inputBox}
                    disabled
                    required={false}
                    defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                    labelStyle={styles.formInputLabel}
                    showTextError={false}
                    error={errors.documentDate}
                  />
                  <AuthInput
                    register={register}
                    registerName='warehouseId'
                    label={t('Forms.Warehouse')}
                    style={styles.inputRow}
                    inputStyle={styles.input}
                    inputBoxStyles={styles.input}
                    disabled
                    required={false}
                    labelStyle={styles.formInputLabel}
                    showTextError={false}
                    error={errors.documentDate}
                  />
                  <Controller
                    control={control}
                    name='partnerId'
                    rules={{
                      required: t('Input_Errors.Required'),
                    }}
                    render={({ field: { onChange, name, value } }) => {
                      return (
                        <div className='formAutocomplete'>
                          <AutoComplete
                            value={value}
                            name={name}
                            onChange={onChange}
                            id='partnersId'
                            data={partnersData}
                            label={t('Forms.Partner')}
                            placeholder={t('Forms.Select_Partner')}
                            showErrorText={false}
                            style={styles.inputRow}
                            labelStyle={styles.formInputLabel}
                            error={errors.partnerId}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className={styles.itemsBox}>
                  <FormItems
                    register={register}
                    control={control}
                    id={id!}
                    fields={fields}
                    remove={remove}
                    errors={errors}
                    onAddItem={onAddItem}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
                <div className={styles.buttonRow}>
                  <div className={styles.buttons}>
                    <Button
                      type='button'
                      onClick={onCencele}
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

export default CreateStorageReturn
