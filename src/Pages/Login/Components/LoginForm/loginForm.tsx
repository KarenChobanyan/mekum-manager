import React from 'react';
import { t } from 'i18next';
import { FieldErrors, FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useGeneralHooks } from '../../../../General/Hooks/hooks';
import { ILoginFormValues } from '../../../../Interfaces/interfaces';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { Button, AuthInput } from '../../../../Components';
import { usePassword } from '../../../../Components/Inputs/input-hooks';
import { HidePasswordIcon, ShowPasswordIcon } from '../../../../Assets/Icons';
import styles from './loginForm.module.scss';

interface IProps {
    register: UseFormRegister<ILoginFormValues>,
    onSubmit: SubmitHandler<ILoginFormValues | FieldValues>,
    handleSubmit: UseFormHandleSubmit<ILoginFormValues, undefined>,
    errors: FieldErrors<ILoginFormValues>,
    loginLoading: boolean
};

const LoginForm: React.FC<IProps> = (props) => {
    const { register, onSubmit, handleSubmit, errors, loginLoading } = props;
    const { password, changeType } = usePassword();
    const {navigate} = useGeneralHooks();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>{t('Login_Form.Title')}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formInputs}>
                    <AuthInput
                        register={register}
                        registerName='username'
                        error={errors.username}
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
                    isLoading={loginLoading}
                />
            </form>
            <div className={styles.signUpRow}>
                <p className={styles.signUpText}>{t('Login_Form.No_Account')}</p>
                <p className={styles.signUp}
                onClick={()=>navigate('/signUp')}
                >{t('Login_Form.Sign_Up')}</p>
            </div>
        </div>
    )
}

export default LoginForm
