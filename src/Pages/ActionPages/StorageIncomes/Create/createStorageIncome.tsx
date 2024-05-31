import React from 'react';
import styles from './styles.module.scss';
import useCreateStorageIncomeHooks from './createSrorageIncome-hooks';
import { AuthInput, AutoComplete, Button, CustomTable } from '../../../../Components';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formItem';

const CreateStorageIncome: React.FC = () => {
  const { register, control, errors, fields, storageName,unitData,onAddItem, handleSubmit, onSubmit, remove,onCencele,warehousesData,suppliersData } = useCreateStorageIncomeHooks();


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
              showTextError={false}
              labelStyle={styles.formInputLabel}
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
                      data={warehousesData}
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
                      data={suppliersData}
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
            <FormItems
              register={register}
              control={control}
              fields={fields}
              remove={remove}
              storageName={storageName}
              unitData={unitData}
              errors={errors}
              onAddItem={onAddItem}
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
