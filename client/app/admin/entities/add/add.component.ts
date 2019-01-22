import {FormField} from '../../../models/entity';
import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {kebabCase, deepClone} from 'lodash';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {EntitiesService} from '../../../core/services/entities.service';
import {Entity} from '../../../models/entity';
import {formElements, inputType} from '../../../models/input';
import {UtilsService} from '../../../core/services/utils.service';
import {ModalEntityComponent} from '../modal-entity/modal-entity.component';
import {EntityTypeService} from '../../../core/services/entity-type.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-add-entity',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    entryComponents: []
})

export class AddEntitiesComponent implements OnInit, OnChanges, OnDestroy {
    entity: Entity;
    entityForm: FormGroup;
    inputType: string[];
    formElements: string[];
    bsModalRef: BsModalRef;
    isUpdate = false;
    entityTypeRoute: string;
    entityIDRoute: string;
    loading = false;

    constructor(
        private entityTypeService: EntityTypeService,
        private entityService: EntitiesService,
        private activatedRoute: ActivatedRoute,
        private modalService: BsModalService,
        private route: Router,
        private utils: UtilsService,
        private fb: FormBuilder
    ) {
        this.inputType = this.utils.enumToArray(inputType);
        this.formElements = this.utils.enumToArray(formElements);
        this.createForm();
    }

    ngOnInit() {
        this.activatedRoute.parent.params.subscribe((params: Params) => {
            this.entityTypeRoute = params['entityType'];
            if (this.entityTypeRoute) {
                this.loading = true;

                this.activatedRoute.params.subscribe((p: Params) => {
                    this.entityIDRoute = p.id;

                    if (p.id) {
                        this.getEntityTypeAndEntity();
                    }
                });
            }
        });
    }

    getEntityTypeAndEntity() {
        this.entityTypeService.get(this.entityTypeRoute, this.entityIDRoute)
            .pipe(
                finalize(() => this.loading = false)
            )
            .subscribe((data) => {
               this.entity = data;
               this.rebuildForm();
            });
    }

    createForm() {
        this.entityForm = this.fb.group({
            name: '',
            formSchema: this.fb.array([]),
            route: {value: '', disabled: true},
            description: ''
        });

        this.onChanges();
    }

    ngOnChanges() {
        this.rebuildForm();
    }

    onChanges(): void {
        this.entityForm.get('name').valueChanges.subscribe(val => {
            this.entityForm.get('route').setValue(kebabCase(val));
        });
    }

    rebuildForm() {
        this.entityForm.reset({
            name: this.entity.name,
            route: this.entity.route,
            description: this.entity.description,
        });
        this.setFormSchema(this.entity.formSchema);
    }

    get formSchema(): FormArray {
        return this.entityForm.get('formSchema') as FormArray;
    }

    setFormSchema(formFields: FormField[]) {
        const formField = formFields.map(field => this.fb.group(field));
        const formSchemaFromArray = this.fb.array(formField);
        this.entityForm.setControl('formSchema', formSchemaFromArray);
    }

    addField() {
        const newFormField = this.fb.group(new FormField());
        newFormField.get('formElement').setValue('input');
        newFormField.get('type').setValue('text');

        this.formSchema.push(newFormField);
    }

    onSubmit() {
        let transaction: any = this.entity;

        this.entity = this.prepareSaveEntity();

        const isUpdate = transaction && transaction._id;

        if (!isUpdate && transaction && transaction._id === undefined) {
            delete transaction._id;
        }

        transaction = isUpdate ? this.entityService.update(this.entity, this.entityTypeRoute) : this.entityService.create(this.entity, this.entityTypeRoute);

        transaction.subscribe(
            data => {
                this.entity = data;
                this.openDialog(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    prepareSaveEntity(): Entity {
        const formModel = this.entityForm.getRawValue();

        const formSchemaDeepCopy: FormField[] = formModel.formSchema.map(
            (field: FormField) => Object.assign({}, field)
        );

        const saveEntity: Entity = {
            name: formModel.name as string,
            route: formModel.route as string,
            description: formModel.description as string,
            formSchema: formSchemaDeepCopy
        };

        if (this.entity && this.entity._id) {
            saveEntity._id = this.entity._id;
        }

        return saveEntity;
    }

    openDialog(data): void {
        const initialState = {
            ...this.handleModalText(data),
            ...data
        };

        this.bsModalRef = this.modalService.show(
            ModalEntityComponent, {initialState, keyboard: false}
        );

        this.bsModalRef.content.action.subscribe((result) => {
            if (result) {
                this[result]();
                this.bsModalRef.hide();
            } else {
                this.goToList();
            }
        });
    }

    handleModalText(data) {
        if (this.isUpdate) {
            return {
                title: `Variável ${data.name}`,
                message: 'Variável alterada com sucesso.',
                detail: 'Variável alterada, você pode alterar novamente ou voltar para a lista.',
                disableNew: true
            };
        }

        return {
            title: `Variável ${data.name}`,
            message: 'Nova variável adicionada',
            detail: 'Altere a variável, adicione outra ou retorne para a listagem de variáveis.'
        };
    }

    changeVariable(): void {
        this.rebuildForm();
    }

    newEntity(): void {
        this.isUpdate = false;
        this.entity = undefined;
        this.createForm();
        this.route.navigate([`admin/${this.entityTypeRoute || 'entities'}/add`]);
    }

    goToList(): void {
        this.route.navigate([`admin/${this.entityTypeRoute || 'entities'}`]);
    }

    revert() {
        this.rebuildForm();
    }

    consoleField(field) {
        console.log(field);
    }

    ngOnDestroy() {
    }
}
