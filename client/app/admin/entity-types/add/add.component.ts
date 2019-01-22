import {Component, OnChanges, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {kebabCase, deepClone, isEqual} from 'lodash';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {UtilsService} from '../../../core/services/utils.service';
import {ModalEntityTypeComponent} from '../modal-entity/modal-entity.component';
import {EntityType} from '../../../models/entity-type';
import {EntityTypeService} from '../../../core/services/entity-type.service';
import {RuntimeVariablesService} from '../../../core/services/runtime-variables.service';
import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';

@Component({
    selector: 'tk-add-entity-type',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    entryComponents: []
})

export class AddEntityTypeComponent implements OnChanges, OnDestroy {
    private _entityType: EntityType;

    get entityType(): EntityType {
        return this._entityType;
    }

    set entityType(entityType: EntityType) {
        this._entityType = entityType;
        this.rebuildForm();
        this.contextHandler.updateValue('entityType', entityType);
    }

    entityForm: FormGroup;
    bsModalRef: BsModalRef;
    isUpdate = false;

    constructor(
        private entityTypeService: EntityTypeService,
        private activatedRoute: ActivatedRoute,
        private modalService: BsModalService,
        private contextHandler: ContextHandlerService,
        private runtimeService: RuntimeVariablesService,
        private route: Router,
        private utils: UtilsService,
        private fb: FormBuilder
    ) {
        this.createForm();

        this.activatedRoute.params.subscribe((params: Params) => {
            const entityID = params['id'];
            if (entityID) {
                this.entityTypeService.get(entityID)
                    .subscribe(
                        data => {
                            this.entityType = data;
                            this.rebuildForm();
                        }
                    );
            }

            this.contextHandler.getContext<EntityType>('entityType')
                .subscribe(data => this.entityType = data);
        });
    }

    createForm() {
        this.entityForm = this.fb.group({
            name: '',
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
            name: this._entityType ? this._entityType.name : '',
            route: this._entityType ? this._entityType.route : '',
            description: this._entityType ? this._entityType.description : '',
        });
    }

    onSubmit() {
        let transaction: any = this._entityType;

        this._entityType = this.prepareSaveEntity();

        this.isUpdate = transaction && transaction._id;

        if (!this.isUpdate && transaction && transaction._id === undefined) {
            delete transaction._id;
        }

        transaction = this.isUpdate ? this.entityTypeService.update(this._entityType) : this.entityTypeService.create(this._entityType);

        transaction.subscribe(
            data => {
                this.entityType = data;
                this.runtimeService.updateEntityTypesByOne(data);
                this.openDialog(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    prepareSaveEntity(): EntityType {
        const formModel = this.entityForm.getRawValue();

        const saveEntity: EntityType = {
            name: formModel.name as string,
            route: formModel.route as string,
            description: formModel.description as string
        };

        if (this.entityType && this.entityType._id) {
            saveEntity._id = this.entityType._id;
        }

        return saveEntity;
    }

    openDialog(data): void {
        const initialState = {
            ...this.handleModalText(data),
            ...data
        };

        this.bsModalRef = this.modalService.show(
            ModalEntityTypeComponent, {initialState, keyboard: false}
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
        this.entityType = undefined;
        this.route.navigate(['admin/entity-types']);
    }

    goToList(): void {
        this.route.navigate(['admin/entity-types']);
    }

    clearEntityType() {
        this.entityType = undefined;
    }

    revert() {
        this.rebuildForm();
    }

    ngOnDestroy() {
    }
}
