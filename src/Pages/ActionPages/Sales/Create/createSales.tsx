import React from 'react';
import { Controller } from 'react-hook-form';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import useCreateSalesHooks from './createSales-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';
import { AuthInput, AutoComplete, Button } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';

const CreateSales: React.FC = () => {
  const { register, control, errors, fields, storageName, buyerName, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, watch, } = useCreateSalesHooks();
  const { t } = useGeneralHooks();
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
              name='buyerId'
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
                      label='Գնորդ'
                      placeholder="Ընտրեք գնորդ"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.buyerId}
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
              buyerName={buyerName}
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

export default CreateSales
