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
    const {id} =useParams();
    const { register, control, onSubmit, onCencele, handleSubmit, cashRegistersData, errors,isLoading } = useCreateCashEntryHooks(id!);
  
    return (
      <div className={styles.container} >
        <div className={styles.body}>
        {
          isLoading
          ?
          <Loading/>
          :
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
                      placeholder="Ընտրեք դրամարկղը"
                      showErrorText={false}
                      style={styles.inputBox}
                      labelStyle={styles.formInputLabel}
                      error={errors.cashRegisterId}
                    />
                  </div>
                );
              }}
            />
            {/* <Controller
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
                      id='recipientId'
                      data={partnersData}
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
            /> */}
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
