import React from 'react';
import styles from './styles.module.scss';
import useCreateStorageIncomeHooks from './createSrorageIncome-hooks';
import { AuthInput, AutoComplete, Button } from '../../../../Components';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';

const CreateStorageIncome: React.FC = () => {
  const { register, control, errors, handleSubmit, onSubmit } = useCreateStorageIncomeHooks()
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
                      data={[{ id: "1", title: "Pahest 1" }]}
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
                      data={[{ id: "1", title: "Mataka8a8 1" }]}
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
           {/* <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div>
           <div>some content</div> */}
          </div>
          <div className={styles.buttonRow}>
            <div className={styles.buttons}>
              <Button
                type='button'
                buttonType={ButtonTypes.Primery}
                title='Չեղարկել'
              />
              <Button
                type='submit'
                buttonType={ButtonTypes.Primery}
                title='Հաստատել'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateStorageIncome
