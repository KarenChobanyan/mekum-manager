import React from 'react';
import styles from '../../formTablestyles.module.scss'
import { AuthInput, AutoComplete, Button } from '../../../../Components';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { useGeneralHooks } from '../../../../General/Hooks/hooks';
import useCreateStorageOutgoingHooks from './createStorageOutgoings-hooks';
import FormItems from './formTable';


const CreateStorageOutgoings:React.FC = () => {
    const { register, control, errors, fields, storageName,unitData,onAddItem, handleSubmit, onSubmit, remove,onCencele,setValue,watch,recipientData,warehousesData } = useCreateStorageOutgoingHooks();
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
                name='recipientId'
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
                        data={recipientData}
                        label='Ստացող'
                        placeholder="Ընտրեք ստացողին"
                        showErrorText={false}
                        style={styles.inputBox}
                        labelStyle={styles.formInputLabel}
                        error={errors.recipientId}
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

export default CreateStorageOutgoings
