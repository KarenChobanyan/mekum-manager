import React from 'react';
import styles from './signUp.module.scss'
import SignUpForm from './SignUpForm/signUpForm';
import useSignUpHooks from './signUp-hooks';

const SignUpPage: React.FC = () => {
    const { register, onSubmit, handleSubmit, errors } = useSignUpHooks();
    return (
        <div className={styles.container}>
            <SignUpForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
            />
        </div>
    )
}

export default SignUpPage
