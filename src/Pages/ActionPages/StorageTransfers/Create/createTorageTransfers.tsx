import React from 'react';
import styles from '../../formTablestyles.module.scss';
import useCreateStorageTransfersHooks from './createStorageTransfers-hooks';
import { useGeneralHooks } from '../../../../General/Hooks/hooks';
import { AuthInput, AutoComplete, Button } from '../../../../Components';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';

const CreateTorageTransfers:React.FC = () => {
    const { register, control, errors, fields, storageOutputName,storageInputName,unitData,onAddItem, handleSubmit, onSubmit, remove,onCencele,setValue,watch,warehousesData } = useCreateStorageTransfersHooks();
    const {t} = useGeneralHooks();
  
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
                  name='outputStorageId'
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
                          label='Ելք․ Պահեստ'
                          placeholder="Ընտրեք ելքագրող պահեստը"
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.outputStorageId}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='inputStorageId'
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
                          data={warehousesData}
                          label='Մուտք․ Պահեստ'
                          placeholder="Ընտրեք ստացող պահեստը"
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.inputStorageId}
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
                  storageOutputName={storageOutputName}
                  storageInputName={storageInputName}
                  unitData={unitData}
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

export default CreateTorageTransfers
