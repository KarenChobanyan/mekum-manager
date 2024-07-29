import React, { ReactNode, useEffect, useState } from 'react';
import {
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Validate,
  UseFormRegister,
} from 'react-hook-form';
import moment from 'moment';
import { useBorder } from '../input-hooks';
import { t } from 'i18next';
import { ILoginFormValues } from '../../../Interfaces/interfaces';
import AuthWarning from '../../AuthWarning/authWarning';
import AuthError from '../../AuthError/authError';
import styles from './authInputs.module.scss';

export interface IInputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  register: UseFormRegister<FieldValues | any>;
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
  inputBoxStyles?: string;
  style?: string;
  showTextError?: boolean;
  labelStyle?: string,
  step?: number,
  warning?: string | null;
}

const AuthInput: React.FC<IInputProps> = (props) => {
  const { border, removeBorder, renderBorder } = useBorder();
  const {
    register,
    onChange,
    validation,
    id,
    type,
    label,
    placeholder,
    registerName,
    defaultValue,
    patternValue,
    required,
    disabled,
    children,
    maxDate,
    minDate,
    message,
    error,
    style,
    inputStyle,
    inputBoxStyles,
    labelStyle,
    showTextError = true,
    step = 0.01,
    warning = null
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
          className={`${styles.inputBox} ${border && styles.border} ${inputBoxStyles} ${error && styles.errorBorder} ${warning && styles.warningBorder}`}
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
            step={step}
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
        {warning && <AuthWarning text={warning} />}
      </div>
    </div>
  );
};

export default AuthInput;
