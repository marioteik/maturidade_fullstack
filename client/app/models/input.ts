export enum inputType {
    'text',
    'password',
    'color',
    'email',
    'number',
    'search',
    'url',
}

export enum dateInputType {
    'date',
    'datetime-local',
    'month',
    'time',
    'week'
}

export enum formElements {
    'input',
    'select',
    'textarea',
    'range',
    'date',
    'checkbox',
    'radio',
    'autocomplete'
}

export interface InputBase {
    name?: string;
    type?: inputType | dateInputType;
    formElement?: formElements;
    value?: 'T';
    readonly?: boolean;
    disabled?: boolean;
    size?: number;
    maxlength?: number;
    minlength?: number;
    autocomplete?: boolean;
    autofocus?: boolean;
    form?: string;
    list?: string;
    min?: number;
    max?: number;
    multiple?: boolean;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    step?: number;
}
