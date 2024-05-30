import React from 'react';
import { t } from 'i18next';
import { FieldErrors, FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { ILoginFormValues } from '../../../../Interfaces/interfaces';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { Button, InputField } from '../../../../Components';
import styles from './loginForm.module.scss';
import { usePassword } from '../../../../Components/Inputs/input-hooks';
import { HidePasswordIcon, ShowPasswordIcon } from '../../../../Assets/Icons';

interface IProps {
    register: UseFormRegister<ILoginFormValues>,
    onSubmit: SubmitHandler<ILoginFormValues | FieldValues>,
    handleSubmit: UseFormHandleSubmit<ILoginFormValues, undefined>,
    errors: FieldErrors<ILoginFormValues>,
    loginLoading: boolean
}
const LoginForm: React.FC<IProps> = (props) => {
    const { register, onSubmit, handleSubmit, errors, loginLoading } = props;
    const { password, changeType } = usePassword();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>{t('Login_Form.Title')}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formInputs}>
                    <InputField
                        register={register}
                        registerName='email'
                        error={errors.email}
                        required
                        label={t('Login_Form.Login_label')}
                        placeholder={t('Login_Form.Login_placeholder')}
                        message={t("Login_Form.Login_Error")}
                        patternValue={/^\s*[A-ZA-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,}\s*$/i}
                    />
                    <InputField
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
                    title={t('Login_Form.Button_text')}
                    isLoading={loginLoading}
                />

            </form>
        </div>
    )
}

export default LoginForm
