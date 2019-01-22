import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {inputType} from '../../models/input';
import {FormField} from '../../models/entity';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor() {
    }

    toFormGroup(fields: FormField[]) {
        let group: any = {};

        fields.forEach(field => {
            let validators = [];

            if (field.required)
                validators.push(Validators.required);

            if (field.type === inputType['10'])
                validators.push(Validators.email);

            if (field.min)
                validators.push(Validators.min(field.min));

            if (field.max)
                validators.push(Validators.max(field.max));

            if (field.minlength)
                validators.push(Validators.minLength(field.minlength));

            if (field.maxlength)
                validators.push(Validators.maxLength(field.maxlength));

            if (field.pattern)
                validators.push(Validators.pattern(field.pattern));

            group[_.camelCase(field.name)] = validators.length > 0 ? new FormControl(field.value || '', validators)
                : new FormControl(field.value || '');
        });

        return new FormGroup(group);
    }

}
