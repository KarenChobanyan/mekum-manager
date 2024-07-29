import React from 'react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { t } from 'i18next'
import useEditUser from './editUser-hooks';
import { AuthInput, AutoComplete, Button, Loading } from '../../../../Components';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import styles from '../../formTablestyles.module.scss';
import UserModal from '../Modal/userModal';

const EditUser: React.FC = () => {
    const { id } = useParams();
    const { control, register, onSubmit, handleSubmit, isLoading, errors, onCencele, roles, currentEmployeeData,onCloseModal,openModal,onOpenModal } = useEditUser(id!);
    const { employeesData } = useAutocompleteData();
    return (
        <div className={styles.container} >
            <div className={styles.body}>
                {
                    currentEmployeeData
                        ?
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
                                                    style={styles.inputRow}
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
                                                    style={styles.inputRow}
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
                                    label={t('Forms.Name')}
                                    style={styles.inputRow}
                                    message={t('Input_Errors.FirstName')}
                                    patternValue={/^\s*[\p{L}-]{3,}\s*$/u}
                                    inputStyle={styles.input}
                                    inputBoxStyles={styles.inputBox}
                                    labelStyle={styles.formInputLabel}
                                    error={errors.name}
                                />
                                <AuthInput
                                    register={register}
                                    registerName='surename'
                                    label={t('Forms.Surname')}
                                    message={t('Input_Errors.Surname')}
                                    patternValue={/^\s*[\p{L}-]{3,}\s*$/u}
                                    style={styles.inputRow}
                                    inputStyle={styles.input}
                                    inputBoxStyles={styles.inputBox}
                                    labelStyle={styles.formInputLabel}
                                    error={errors.surename}
                                />
                                <AuthInput
                                    register={register}
                                    registerName='username'
                                    label={t('Login_Form.Login_label')}
                                    message={t('Input_Errors.Email')}
                                    patternValue={/^\s*[A-ZA-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,}\s*$/gim}
                                    style={styles.inputRow}
                                    inputStyle={styles.input}
                                    inputBoxStyles={styles.inputBox}
                                    labelStyle={styles.formInputLabel}
                                    error={errors.username}
                                />
                                <AuthInput
                                    register={register}
                                    registerName='password'
                                    label={t('Login_Form.Password_label')}
                                    message={t('Input_Errors.Password')}
                                    patternValue={
                                        /^.{6,}$/gm
                                    }
                                    style={styles.inputRow}
                                    inputStyle={styles.input}
                                    inputBoxStyles={styles.inputBox}
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
                                        title={t('Button.Close')}
                                        buttonStyle={styles.button}
                                    />
                                    <Button
                                        type='submit'
                                        buttonType={ButtonTypes.Primery}
                                        title={t('Button.Save')}
                                        buttonStyle={styles.button}
                                    />
                                    <Button
                                        type='button'
                                        buttonType={ButtonTypes.Primery}
                                        title={t('Button.Delete')}
                                        onClick={onOpenModal}
                                        buttonStyle={styles.deleteButton}
                                    />
                                </div>
                                <UserModal
                                id={id!}
                                open={openModal}
                                handleClose={onCloseModal}
                                />
                            </div>
                        </form>
                        :
                        <Loading />
                }

            </div>
        </div>
    )
}

export default EditUser
