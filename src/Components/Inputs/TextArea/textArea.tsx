import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useBorder } from '../input-hooks';
import AuthError from '../../AuthError/authError';
import styles from '../AuthInput/authInputs.module.scss';

export interface ITextAreaProps {
    placeholder?: string,
    label: string,
    register: UseFormRegister<any>,
    registerName: string,
    patternValue?: RegExp,
    message?: string,
    required?: boolean,
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    id?: string,
    rows?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputStyle?: string;
    style?: string;
    showTextError?: boolean;
    labelStyle?: string
}

const TextArea: React.FC<ITextAreaProps> = (props) => {
    const { t } = useTranslation()
    const { border, removeBorder, renderBorder } = useBorder();
    const { label, placeholder, register, registerName, message, error, id, patternValue, style, inputStyle, labelStyle, rows, required = false, showTextError } = props;
    return (
        <div className={`${styles.container} ${style}`}>
            <label htmlFor={id} className={`${styles.label} ${labelStyle}`}>
                {label}
                {
                    error && <span className={styles.labelError}>*</span>
                }
            </label>
            <div
                className={`${styles.inputBox} ${border && styles.border} ${inputStyle} ${error && styles.errorBorder}`}
                onFocus={renderBorder}
                onBlur={removeBorder}
            >
                <textarea
                    id={id}
                    className={`${styles.input} ${inputStyle}`}
                    rows={rows}
                    placeholder={placeholder}
                    {...register(registerName, {
                        required: required !== false && t('Input_Errors.Required'),
                        pattern: {
                            value: patternValue || /.*/,
                            message: message || ''
                        },
                    })}
                />
            </div>
            {
                showTextError
                &&
                <AuthError text={error && error.message} />
            }
        </div>
    )
}

export default TextArea