import React, { ReactNode, useEffect, useState } from 'react';
import {
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Validate,
} from 'react-hook-form';
import moment from 'moment';
import { useBorder } from './input-hooks';
import { t } from 'i18next';
import { InputRegisterTypes, LoginFormValues } from '../../Interfaces/interfaces';
import styles from './authInputs.module.scss';
import AuthError from '../AuthError/authError';

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
  inputStyle?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: string | number | undefined;
  maxDate?: string | number | undefined;
  children?: ReactNode;
  required?: boolean;
  validation?:
    | Validate<any, FieldValues | LoginFormValues>
    | Record<string, Validate<any, FieldValues | LoginFormValues>>
    | undefined;
  style?: React.CSSProperties;
}

const InputField: React.FC<IInputProps> = (props) => {
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
  } = props;
  const [inputValue, setInputValue] = useState<string | undefined>(
    defaultValue
  );

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.container} style={style}>
      <label htmlFor={id} className={styles.label}>
        {label!}
        {error && <span className={styles.labelError}>*</span>}
      </label>
      <div
        className={
          border
            ? `${styles.inputBox} ${styles.border} ${inputStyle}`
            : `${styles.inputBox} ${inputStyle}`
        }
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
      {<AuthError text={error && error.message} />}
    </div>
  );
};

export default InputField;
