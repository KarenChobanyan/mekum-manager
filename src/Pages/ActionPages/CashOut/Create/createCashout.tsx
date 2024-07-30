import React from 'react';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import useCreateCashoutHooks from './createCashout-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import styles from '../../formTablestyles.module.scss'
import moment from 'moment';
import { useParams } from 'react-router';

const CreateCashout: React.FC = () => {
  const { id } = useParams();
  const { register, control, onSubmit, onCencele, handleSubmit, cashRegistersData, partnersData, errors, isLoading } = useCreateCashoutHooks(id!);

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
                  registerName='date'
                  label='Ամսաթիվ'
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.inputBox}
                  disabled
                  required={false}
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.date}
                />
              <AuthInput
                  register={register}
                  registerName='cashRegisterId'
                  label={t('Forms.CassRegister')}
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.inputBox}
                  disabled
                  required={false}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.cashRegisterId}
                />
                 <AuthInput
                  register={register}
                  registerName='balance'
                  label={t('Forms.Remainder')}
                  showTextError={false}
                  disabled
                  type='number'
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  labelStyle={styles.formInputLabel}
                  inputBoxStyles={styles.inputBox}
                />
                <Controller
                  control={control}
                  name='partner'
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
                          id='recipientId'
                          data={partnersData}
                          label={t('Forms.Partner')}
                          placeholder={t('Forms.Select_Partner')}
                          showErrorText={false}
                          style={styles.inputRow}
                          labelStyle={styles.formInputLabel}
                          error={errors.partner}
                        />
                      </div>
                    );
                  }}
                />
                <AuthInput
                  register={register}
                  registerName='money'
                  label={t('Forms.Money')}
                  showTextError={false}
                  type='number'
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.inputBox}
                  labelStyle={styles.formInputLabel}
                  error={errors.money}
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

export default CreateCashout
