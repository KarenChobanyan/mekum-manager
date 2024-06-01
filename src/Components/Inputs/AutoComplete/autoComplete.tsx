import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuthError from '../../AuthError/authError';
import { IAutocompleteData, IAutocompleteItem } from '../../../Interfaces/componentTypes';
import styles from '../AuthInput/authInputs.module.scss';

interface IAutoCompleteProps {
    data: IAutocompleteData | undefined;
    label?: string;
    disable?: boolean;
    id: string;
    value?: IAutocompleteItem | null;
    name: string;
    onChange: (arg: IAutocompleteItem | null) => void;
    placeholder: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    showErrorText?: boolean;
    style?: string;
    labelStyle?: string
}

const AutoComplete: React.FC<IAutoCompleteProps> = (props) => {
    const { data, label, error, onChange, id, placeholder, disable, value, showErrorText = true, style, labelStyle } =
        props;
    const options = (data ?? []).map((item) => item);

    return (
        <div className={`${styles.container} ${style}`}>
            {label
                &&
                <label htmlFor={id} className={`${styles.label} ${labelStyle}`}>
                    {label!}
                    {error && <span style={{ color: '#b00020', marginLeft: '5px' }}>*</span>}
                </label>
            }
            <div >
                <Autocomplete
                    value={!value ? null : value}
                    disabled={disable}
                    disablePortal
                    id={id}
                    fullWidth={true}
                    className={error && styles.errorBorder}
                    options={options}
                    getOptionLabel={(options) => options.title}
                    onChange={(_, selected) => {
                        onChange(selected);
                    }}

                    multiple={false}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.title}
                            </li>
                        );
                    }}
                    renderInput={(params: Object) => {
                        return <TextField label={placeholder} {...params} />;
                    }}
                />
            </div>
            {showErrorText && <AuthError text={error && error.message} />}
        </div>
    );
};

export default AutoComplete;
