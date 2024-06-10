import React from 'react';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import useCreateStorageTransfersHooks from './createStorageTransfers-hooks';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';

const CreateTorageTransfers: React.FC = () => {
  const { register, control, errors, fields, isLoading, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, watch } = useCreateStorageTransfersHooks();
  const { t } = useGeneralHooks();
  const { myWarehousesData, allWarehousesData } = useAutocompleteData();

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
                  type='date'
                  style={styles.inputBox}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.input}
                  disabled
                  required={false}
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.documentDate}
                />
                <Controller
                  control={control}
                  name='warehouseOutId'
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
                          id='storageId'
                          data={myWarehousesData}
                          label='Ելք․ Պահեստ'
                          placeholder="Ընտրեք ելքագրող պահեստը"
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.warehouseOutId}
                        />
                      </div>
                    );
                  }}
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
                          data={allWarehousesData}
                          label='Մուտք․ Պահեստ'
                          placeholder="Ընտրեք ստացող պահեստը"
                          showErrorText={false}
                          style={styles.inputBox}
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
