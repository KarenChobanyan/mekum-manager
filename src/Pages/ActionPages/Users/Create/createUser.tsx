import React from 'react';
import useCreateUsersHooks from './createUser-hooks';
import { useAutocompleteData, useGeneralHooks } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import styles from '../../formTablestyles.module.scss';
import { Controller } from 'react-hook-form';

const CreateUser: React.FC = () => {
    const { register, handleSubmit, onSubmit, onCencele, control, errors, roles, isLoading } = useCreateUsersHooks();
    const { t } = useGeneralHooks();
    const { employeesData } = useAutocompleteData();

    return (
        <div className={styles.container} >
            {isLoading 
                ?
                <Loading />
                :
                <div className={styles.body}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={styles.form}>
                            <Controller
                                control={control}
                                name='role'
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
                                                data={roles}
                                                label={t('Roles.Role')}
                                                placeholder={t('Roles.Placeholder')}
                                                showErrorText={false}
                                                style={styles.inputBox}
                                                labelStyle={styles.formInputLabel}
                                                error={errors.role}
                                            />
                                        </div>
                                    );
                                }}
                            />
                            <Controller
                                control={control}
                                name='employee'
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
                                                id='employee'
                                                data={employeesData}
                                                label={t('Employee.Title')}
                                                placeholder={t('Employee.Placeholder')}
                                                showErrorText={false}
                                                style={styles.inputBox}
                                                labelStyle={styles.formInputLabel}
                                                error={errors.employee}
                                            />
                                        </div>
                                    );
                                }}
                            />
                            <AuthInput
                                register={register}
                                registerName='name'
                                label='Անուն'
                                style={styles.inputBox}
                                message={t('Input_Errors.FirstName')}
                                patternValue={/^\s*[\p{L}-]{3,}\s*$/u}
                                inputStyle={styles.input}
                                inputBoxStyles={styles.input}
                                labelStyle={styles.formInputLabel}
                                error={errors.name}
                            />
                            <AuthInput
                                register={register}
                                registerName='surename'
                                label='Ազգանուն'
                                message={t('Input_Errors.Surname')}
                                patternValue={/^\s*[\p{L}-]{3,}\s*$/u}
                                style={styles.inputBox}
                                inputStyle={styles.input}
                                inputBoxStyles={styles.input}
                                labelStyle={styles.formInputLabel}
                                error={errors.surename}
                            />
                            <AuthInput
                                register={register}
                                registerName='username'
                                label='էլ․ հասցե'
                                message={t('Input_Errors.Email')}
                                patternValue={/^\s*[A-ZA-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,}\s*$/gim}
                                style={styles.inputBox}
                                inputStyle={styles.input}
                                inputBoxStyles={styles.input}
                                labelStyle={styles.formInputLabel}
                                error={errors.username}
                            />
                            <AuthInput
                                register={register}
                                registerName='password'
                                label='Գաղտնաբառ'
                                message={t('Input_Errors.Password')}
                                patternValue={
                                    /^.{6,}$/gm
                                }
                                style={styles.inputBox}
                                inputStyle={styles.input}
                                inputBoxStyles={styles.input}
                                labelStyle={styles.formInputLabel}
                                error={errors.password}
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
            }
        </div>
    )
}

export default CreateUser
