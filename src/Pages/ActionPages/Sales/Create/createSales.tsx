import React from 'react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import moment from 'moment';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import useCreateSalesHooks from './createSales-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import FormItems from './formTable';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import SaleModal from '../Modal/saleModal';
import styles from '../../formTablestyles.module.scss';

const CreateSales: React.FC = () => {
  const { id } = useParams();
  const { register, control, errors, fields, isLoading, onAddItem, handleSubmit, onSubmit, remove, onCencele, setValue, isValid, watch, setSalePrice, onCloseModal, modal, handleOpenModal,total } = useCreateSalesHooks(id!);
  const { t } = useGeneralHooks();
  const { myWarehousesData, partnersData } = useAutocompleteData();


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
                  registerName='documentDate'
                  label={t('Forms.Date')}
                  style={styles.inputBox}
                  inputStyle={styles.input}
                  inputBoxStyles={styles.input}
                  disabled
                  required={false}
                  defaultValue={moment(new Date()).format("DD/MM/YYYY")}
                  labelStyle={styles.formInputLabel}
                  showTextError={false}
                  error={errors.documentDate}
                />
                <Controller
                  control={control}
                  name='warehouseId'
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
                          disable
                          data={myWarehousesData}
                          label={t('Forms.Warehouse')}
                          placeholder={t('Forms.Select_Warehouse')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.warehouseId}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='partnerId'
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
                          id='partnersId'
                          data={partnersData}
                          label={t('Forms.Buyer')}
                          placeholder={t('Forms.Select_Buyer')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                          error={errors.partnerId}
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
                  id={id!}
                  fields={fields}
                  remove={remove}
                  errors={errors}
                  onAddItem={onAddItem}
                  setValue={setValue}
                  watch={watch}
                  setSalePrice={setSalePrice}
                />
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.buttons} style={{ width: '600px' }}>
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
                  <Button
                    type='button'
                    onClick={handleOpenModal}
                    disable={!isValid}
                    buttonType={isValid ? ButtonTypes.Primery : ButtonTypes.Disabled}
                    title={t('Button.Submit&Levy')}
                    buttonStyle={styles.button}
                  />
                </div>
                {total}
              </div>
            </form>
        }
        {isValid
          &&
          <SaleModal
            data={modal}
            handleClose={onCloseModal}
          />
        }

      </div>
    </div>
  )
}

export default CreateSales
