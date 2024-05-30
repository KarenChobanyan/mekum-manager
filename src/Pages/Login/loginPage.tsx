import React from 'react';
import useLoginHooks from './login-hooks';
import LoginForm from './Components/LoginForm/loginForm';
import styles from './login.module.scss';

const LoginPage:React.FC = () => {
  const {register,onSubmit,handleSubmit,errors,isLoading} = useLoginHooks();
  return (
    <div className={styles.container}>
      <LoginForm
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
      loginLoading={isLoading}
      />
    </div>
  )
}

export default LoginPage
