import React from 'react';
import LoginForm from './Components/LoginForm/loginForm';
import styles from './login.module.scss';
import useLoginHooks from './login-hooks';

const LoginPage:React.FC = () => {
  const {register,onSubmit,handleSubmit,errors} = useLoginHooks();
  return (
    <div className={styles.container}>
      <LoginForm
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
      />
    </div>
  )
}

export default LoginPage
