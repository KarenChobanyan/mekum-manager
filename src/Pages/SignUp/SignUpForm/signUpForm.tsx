import React from 'react';
import { FieldErrors, FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import {t} from 'i18next';
import { AuthInput, Button } from '../../../Components';
import { usePassword } from '../../../Components/Inputs/input-hooks';
import { HidePasswordIcon, ShowPasswordIcon } from '../../../Assets/Icons';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import { ISignUpFormValues } from '../../../Interfaces/interfaces';
import styles from './signUpForm.module.scss';

interface IProps {
    register: UseFormRegister<ISignUpFormValues>,
    onSubmit: SubmitHandler<ISignUpFormValues | FieldValues>,
    handleSubmit: UseFormHandleSubmit<ISignUpFormValues, undefined>,
    errors: FieldErrors<ISignUpFormValues>,
    //loading
};

const SignUpForm:React.FC<IProps>= (props) => {
    const {onSubmit,handleSubmit,register,errors} = props;
    const { password, changeType } = usePassword();

  return (
    <div className={styles.container}>
            <div className={styles.title}>
                <span>{t('Login_Form.Title')}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formInputs}>
                    <AuthInput
                        register={register}
                        registerName='firstName'
                        error={errors.firstName}
                        required
                        label={t('Forms.Name')}
                        placeholder={t('Login_Form.Login_placeholder')}
                        message={t("Login_Form.Login_Error")}
                        patternValue={/^[A-Za-z]{3,}$/}
                    />
                    <AuthInput
                        register={register}
                        registerName='lastName'
                        error={errors.lastName}
                        required
                        label={t('Login_Form.Login_label')}
                        placeholder={t('Login_Form.Login_placeholder')}
                        message={t("Login_Form.Login_Error")}
                        patternValue={/^[A-Za-z]{3,}$/}
                    />
                     <AuthInput
                        register={register}
                        registerName='email'
                        error={errors.email}
                        required
                        label={t('Login_Form.Login_label')}
                        placeholder={t('Login_Form.Login_placeholder')}
                        message={t("Login_Form.Login_Error")}
                        patternValue={/^\s*[A-ZA-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,}\s*$/i}
                    />
                    <AuthInput
                        register={register}
                        registerName='password'
                        error={errors.password}
                        label={t('Login_Form.Password_label')}
                        placeholder={t('Login_Form.Password_placeholder')}
                        required
                        type={password ? 'password' : 'text'}
                        children={
                            <img
                                className={styles.inputIcon}
                                src={password ? HidePasswordIcon : ShowPasswordIcon}
                                alt="eyeIcon"
                                onClick={changeType}
                            />
                        }
                    />
                </div>
                <Button
                    type='submit'
                    buttonType={ButtonTypes.Primery}
                    title={t('Button.Login')}
                    // isLoading={loginLoading}
                />
            </form>
        </div>
  )
}

export default SignUpForm
