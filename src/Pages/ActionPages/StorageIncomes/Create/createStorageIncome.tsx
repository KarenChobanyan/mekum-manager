import React from 'react';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import useCreateStorageIncomeHooks from './createSrorageIncome-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button } from '../../../../Components';
import FormTable from './formTable';
import styles from '../../formTablestyles.module.scss';

const CreateStorageIncome: React.FC = () => {
  const { register, control, errors, fields, storageName,onAddItem, handleSubmit, onSubmit, remove,onCencele,setValue,watch } = useCreateStorageIncomeHooks();
 const {myWarehousesData,partnersData} = useAutocompleteData();

  return (
    <div className={styles.container} >
      <div className={styles.body}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <div className={styles.form}>
            <AuthInput
              register={register}
              registerName='date'
              label='Ամսաթիվ'
              type='date'
              style={styles.inputBox}
              inputStyle={styles.input}
              inputBoxStyles={styles.input}
              labelStyle={styles.formInputLabel}
              showTextError={false}
              error={errors.date}
            />
            <Controller
              control={control}
              name='storageId'
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
                      label='Պահեստ'
                      placeholder="Ընտրեք պահեստը"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.storageId}
                    />
                  </div>
                );
              }}
            />
            <Controller
              control={control}
              name='supplierId'
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
                      data={partnersData}
                      label='Մատակարար'
                      placeholder="Ընտրեք մատակարարին"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.supplierId}
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
      </div>
    </div>
  )
}

export default CreateStorageIncome
