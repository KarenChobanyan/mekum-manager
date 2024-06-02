import React from 'react';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import useCreateCashIncomeHooks from './createCashIncoming-hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, TextArea } from '../../../../Components';
import styles from '../../formTablestyles.module.scss'

const CreateCashout: React.FC = () => {
    const { register, control, onSubmit, onCencele, handleSubmit, cashBoxesData, payersData, errors } = useCreateCashIncomeHooks();

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
                            name='cashBoxId'
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
                                            data={cashBoxesData}
                                            label='Դրամարկղ'
                                            placeholder="Ընտրեք դրամարկղը"
                                            showErrorText={false}
                                            style={styles.inputBox}
                                            labelStyle={styles.formInputLabel}
                                            error={errors.cashBoxId}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name='payer'
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
                                            id='payer'
                                            data={payersData}
                                            label='Ստացող'
                                            placeholder="Ընտրեք ստացողին"
                                            showErrorText={false}
                                            style={styles.inputBox}
                                            labelStyle={styles.formInputLabel}
                                            error={errors.payer}
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

export default CreateCashout
