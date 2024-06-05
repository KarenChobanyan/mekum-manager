import React from 'react';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import useCreateCashTransferHooks from './createCashTransfer-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, TextArea } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';

const CreateCashTransfer: React.FC = () => {
  const { register, control, onSubmit, onCencele, handleSubmit, cashBoxesData, errors } = useCreateCashTransferHooks();

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
              name='cashBoxFromId'
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
                      id='cashBoxFromId'
                      data={cashBoxesData}
                      label='Ելք․ դրամարկղ'
                      placeholder="Ընտրեք ելք․ դրամարկղը"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.cashBoxFromId}
                    />
                  </div>
                );
              }}
            />
            <Controller
              control={control}
              name='cashBoxInId'
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
                      id='cashBoxInId'
                      data={cashBoxesData}
                      label='Մուտք դարամարկղ'
                      placeholder="Ընտրեք դրամարկղը"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.cashBoxInId}
                    />
                  </div>
                );
              }}
            />
            <AuthInput
              register={register}
              registerName='amount'
              label='Գումար'
              showTextError={false}
              type='number'
              style={styles.inputBox}
              inputStyle={styles.input}
              inputBoxStyles={styles.input}
              labelStyle={styles.formInputLabel}
              error={errors.amount}
            />
            <TextArea
              register={register}
              registerName='description'
              label='Նկարագրություն'
              style={styles.inputBox}
              inputStyle={styles.input}
              labelStyle={styles.formInputLabel}
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

export default CreateCashTransfer
