import React from 'react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { t } from 'i18next';
import moment from 'moment';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import useCreateCashEntryHooks from './createCashIncoming-hooks';
import styles from '../../formTablestyles.module.scss';

const CreateCashout: React.FC = () => {
  const { id } = useParams();
  const { register, control, onSubmit, onCencele, handleSubmit, partnersData, errors, isLoading, setPartnerDebt, warning } = useCreateCashEntryHooks(id!);

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
                  label={t('Forms.Date')}
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
                          onChange={(value) => {
                            onChange(value)
                          }
                          }
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
                  registerName='debt'
                  label={t('Forms.Debt')}
                  showTextError={false}
                  disabled
                  type='number'
                  style={styles.inputRow}
                  inputStyle={styles.input}
                  labelStyle={styles.formInputLabel}
                  inputBoxStyles={styles.inputBox}
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
                  inputontainerStyle={styles.inputContainer}
                  labelStyle={styles.formInputLabel}
                  error={errors.money}
                  warning={warning}
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
