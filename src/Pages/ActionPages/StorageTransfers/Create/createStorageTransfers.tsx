import React from 'react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import moment from 'moment';
import useCreateStorageTransfersHooks from './createStorageTransfers-hooks';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';

const CreateTorageTransfers: React.FC = () => {
  const {id} = useParams();
  const { register, control, errors, fields, isLoading,warehouse, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, watch } = useCreateStorageTransfersHooks(id!);
  const { t } = useGeneralHooks();
  const { myWarehousesData, allWarehousesData } = useAutocompleteData();
  const createwharehouseInData = ()=>{
    const myWarehouse = myWarehousesData ?? []
    const allWarehouses = allWarehousesData ? [...allWarehousesData!,...myWarehouse!] : [];
    const warehouseInData = allWarehouses.filter((item)=>item.id !== id);
    return warehouseInData
  };

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
                  registerName='warehouseOutId'
                  label={t('Forms.Warehouse_Out')}
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.inputBox}
                  disabled
                  required={false}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.warehouseOutId}
                />
                <Controller
                  control={control}
                  name='warehouseEnterId'
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
                          id='supplierId'
                          data={createwharehouseInData()}
                          label={t('Forms.Warehouse_In')}
                          placeholder={t('Forms.Warehouse_In—Placeholder')}
                          showErrorText={false}
                          style={styles.inputRow}
                          labelStyle={styles.formInputLabel}
                          error={errors.warehouseEnterId}
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
                  fields={fields}
                  warehouse={warehouse!}
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
                    title='Չեղարկել'
                    buttonStyle={styles.button}
                  />
                  <Button
                    type='submit'
                    buttonType={ButtonTypes.Primery}
                    title='Հաստատել'
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

export default CreateTorageTransfers
