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
  const { register, control, onSubmit, onCencele, handleSubmit, cashRegistersData, partnersData, errors, isLoading,setPartnerDebt } = useCreateCashEntryHooks(id!);

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
                  style={styles.inputBox}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.input}
                  disabled
                  required={false}
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.date}
                />
                <Controller
                  control={control}
                  name='cashRegisterId'
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
                          id='cashBoxId'
                          data={cashRegistersData}
                          disable
                          label={t('Forms.CassRegister')}
                          placeholder={t('Forms.Select_CashRegister')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.cashRegisterId}
                        />
                      </div>
                    );
                  }}
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
                          onChange={(value)=>{
                            onChange(value)
                            setPartnerDebt(value?.id!)
                          }
                          }
                          id='recipientId'
                          data={partnersData}
                          label={t('Forms.Partner')}
                          placeholder={t('Forms.Select_Partner')}
                          showErrorText={false}
                          style={styles.inputBox}
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
                  style={styles.inputBox}
                  inputStyle={styles.input}
                  labelStyle={styles.formInputLabel}
                  inputBoxStyles={styles.input}
                />
                <AuthInput
                  register={register}
                  registerName='money'
                  label={t('Forms.Money')}
                  showTextError={false}
                  type='number'
                  style={styles.inputBox}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.input}
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
