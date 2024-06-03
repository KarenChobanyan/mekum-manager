import React, { ReactNode, useEffect, useState } from 'react';
import {
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Validate,
} from 'react-hook-form';
import moment from 'moment';
import { useBorder } from '../input-hooks';
import { t } from 'i18next';
import { InputRegisterTypes, ILoginFormValues } from '../../../Interfaces/interfaces';
import AuthError from '../../AuthError/authError';
import styles from './authInputs.module.scss';

export interface IInputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  register: InputRegisterTypes;
  registerName: string;
  patternValue?: RegExp;
  message?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: string | number | undefined;
  maxDate?: string | number | undefined;
  children?: ReactNode;
  required?: boolean;
  validation?:
  | Validate<any, FieldValues | ILoginFormValues>
  | Record<string, Validate<any, FieldValues | ILoginFormValues>>
  | undefined;
  inputStyle?: string;
  style?: string;
  showTextError?: boolean;
  labelStyle?: string
}

const AuthInput: React.FC<IInputProps> = (props) => {
  const { border, removeBorder, renderBorder } = useBorder();
  const {
    minDate,
    maxDate,
    inputStyle,
    label,
    placeholder,
    type,
    defaultValue,
    register,
    registerName,
    onChange,
    message,
    error,
    id,
    disabled,
    children,
    patternValue,
    validation,
    required,
    style,
    labelStyle,
    showTextError = true
  } = props;
  const [inputValue, setInputValue] = useState<string | undefined>(
    defaultValue
  );

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`${styles.container} ${style}`} >
      {label
        &&
        <label htmlFor={id} className={`${styles.label} ${labelStyle}`}>
          {label!}
          {error && <span className={styles.labelError}>*</span>}
        </label>
      }
      <div className={styles.inputContainer}>
      <div
        className={`${styles.inputBox} ${border && styles.border} ${inputStyle} ${error && styles.errorBorder}`}
        onFocus={renderBorder}
        onBlur={removeBorder}
      >
        <input
          id={id}
          type={type}
          disabled={disabled}
          defaultValue={
            inputValue ? (type === 'date' ? undefined : inputValue) : undefined
          }
          value={
            inputValue
              ? type === 'date'
                ? moment(defaultValue).format('YYYY-MM-DD')
                : undefined
              : undefined
          }
          onKeyDown={(e) => {
            type === 'date' && e.preventDefault();
          }}
          className={`${styles.input} ${inputStyle}`}
          placeholder={defaultValue ? undefined : placeholder}
          min={minDate}
          max={maxDate}
          {...register(registerName, {
            required: required !== false && t('Input_Errors.Required'),
            onChange: onChange,
            validate: validation,
            pattern: {
              value: patternValue || /.*/,
              message: message || '',
            },
          })}
        />
        {children && (
          <div
            onClick={renderBorder}
            onBlur={removeBorder}
            className={styles.eyeCont}
          >
            {children && children}
          </div>
        )}
      </div>
      {showTextError && <AuthError text={error && error.message} />}
      </div>
    </div>
  );
};

export default AuthInput;
