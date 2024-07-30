import React from 'react';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import { t } from 'i18next';
import useCreateCashTransferHooks from './createCashTransfer-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, Loading, } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';
import { useParams } from 'react-router';

const CreateCashTransfer: React.FC = () => {
  const {id} = useParams();
  const { register, control, onSubmit, onCencele, handleSubmit, watch, isLoading, cashRegistersData,allCashRegistersData, errors } = useCreateCashTransferHooks(id!);

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
                  labelStyle={styles.formInputLabel}
                  required={false}
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  showTextError={false}
                  error={errors.date}
                />
                <Controller
                  control={control}
                  name='exitCashRegisterId'
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
                          id='exitCashRegisterId'
                          data={watch(`entryCashRegisterId`) ?
                            cashRegistersData?.filter((item) => item.id !== watch(`entryCashRegisterId`)?.id!)
                            :
                            cashRegistersData
                          }
                          label={t('Forms.Cash_Out')}
                          placeholder={t('Forms.Select_Cashout')}
                          showErrorText={false}
                          style={styles.inputRow}
                          labelStyle={styles.formInputLabel}
                          error={errors.exitCashRegisterId}
                        />
                      </div>
                    );
                  }}
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
                  name='entryCashRegisterId'
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
                          id='entryCashRegisterId'
                          data={watch(`exitCashRegisterId`) ?
                            allCashRegistersData?.filter((item) => item.id !== watch(`exitCashRegisterId`)?.id!)
                            :
                            allCashRegistersData
                          }
                          label={t('Forms.Cash_Entry')}
                          placeholder={t('Forms.Select_CashRegister')}
                          showErrorText={false}
                          style={styles.inputRow}
                          labelStyle={styles.formInputLabel}
                          error={errors.entryCashRegisterId}
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

export default CreateCashTransfer
