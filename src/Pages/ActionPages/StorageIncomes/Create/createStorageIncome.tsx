import React from 'react';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import moment from 'moment';
import useCreateStorageIncomeHooks from './createSrorageIncome-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import FormTable from './formTable';
import styles from '../../formTablestyles.module.scss';

const CreateStorageIncome: React.FC = () => {
  const { register, control, errors, fields, storageName, supplierName, isLoading, setSupplierName, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, watch } = useCreateStorageIncomeHooks();
  const { myWarehousesData, partnersData } = useAutocompleteData();

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
                  required={false}
                  disabled
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.documentDate}
                />
                <Controller
                  control={control}
                  name='warehouseId'
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
                          label={t('Forms.Warehouse')}
                          placeholder={t('Forms.Select_Warehouse')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.warehouseId}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='partnersId'
                  rules={{
                    required: t('Input_Errors.Required'),
                  }}
                  render={({ field: { onChange, name, value } }) => {
                    return (
                      <div className='formAutocomplete'>
                        <AutoComplete
                          value={value}
                          name={name}
                          onChange={(value) => {
                            setSupplierName(value?.title!)
                            onChange(value)
                          }}
                          id='supplierId'
                          data={partnersData}
                          label={t('Forms.PartnerIn')}
                          placeholder={t('Forms.Select_PartnerIn')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.partnersId}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className={styles.itemsBox}>
                <FormTable
                  register={register}
                  control={control}
                  fields={fields}
                  remove={remove}
                  storageName={storageName}
                  supplierName={supplierName}
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

export default CreateStorageIncome
