import {Component, OnChanges, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';

import {ModalEntityComponent} from '../modal-entity/modal-entity.component';
import {DynamicFormService} from '../../../core/services/dynamic-form.service';
import {Entity, FormField} from '../../../models/entity';
import {UtilsService} from '../../../core/services/utils.service';
import {EntitiesService} from '../../../core/services/entities.service';
import {EntityItemService} from '../../../core/services/entity-item.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable} from 'rxjs';
import {EntityTypeService} from '../../../core/services/entity-type.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'tk-add-entity',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
    entryComponents: [ModalEntityComponent],
    providers: [DynamicFormService]
})

export class AddEntityItemComponent implements OnDestroy {
    entity: Entity;
    entityType: string;
    entityID: string;
    entityItemID: string;
    loading: boolean;

    entityItem: any = {};
    entityForm: FormGroup;
    matcher = new MyErrorStateMatcher();
    controls: string[] = [];
    bsModalRef: BsModalRef;
    isUpdate = false;

    constructor(
        private entityTypeService: EntityTypeService,
        private entitiesService: EntitiesService,
        private entityItemService: EntityItemService,
        private activatedRoute: ActivatedRoute,
        private modalService: BsModalService,
        private location: Location,
        private route: Router,
        private utils: UtilsService,
        private dynamicFormService: DynamicFormService
    ) {
        this.activatedRoute.parent.params.subscribe((params: Params) => {
            this.entityType = params['entityType'];
            if (this.entityType) {
                this.loading = true;

                this.activatedRoute.params.subscribe((p: Params) => {
                    this.entityID = p.id;
                    this.entityItemID = p.entityItemId;

                    if (p.id) {
                        this.getEntityTypeAndEntity();
                    }
                });
            }
        });
    }

    getEntityTypeAndEntity() {
        this.entityTypeService.get(this.entityType, this.entityID)
            .subscribe((data) => {
                this.entity = data;
                this.createForm();

                if (this.entityItemID) {
                    this.getItemInfo(this.entityItemID);
                }
            });
    }

    /*getEntityInfo(): Observable<any> {
        return new Observable((observer) => {
            this.entitiesService.get(entityID)
                .subscribe(
                    (data: Entity) => {
                        this.entityItem = data;
                        this.entityItemService.endpoint = data.route;
                        this.rebuildForm();
                        //this.createForm();

                        observer.next();
                        observer.complete();
                    }
                );
        });
    }*/

    getItemInfo(itemID) {
        if (itemID) {
            this.entitiesService.get(this.entity.route, itemID)
                .subscribe(
                    (data: Entity) => {
                        this.entityItem = data;
                        this.rebuildForm();
                    }
                );
        }
    }

    createForm() {
        this.entityForm = this.dynamicFormService.toFormGroup(this.entity ? this.entity.formSchema : []);
        this.controls = Object.keys(this.entityForm.controls);
    }

    rebuildForm() {
        const controls = Object.keys(this.entityForm.controls);

        controls.forEach((el) => {
            this.entityForm.get(el).setValue(this.entityItem[el]);
        });
    }

    onSubmit() {
        let transaction: any = this.entityItem;

        this.entityItem = this.prepareSaveEntity();

        this.isUpdate = transaction && transaction._id;

        if (!this.isUpdate && transaction && transaction._id === undefined) {
            delete transaction._id;
        }

        transaction = this.isUpdate ? this.entityItemService.update(this.entityItem, this.entity.route) : this.entityItemService.create(this.entityItem, this.entity.route);

        transaction.subscribe(
            data => {
                this.entityItem = data;
                this.openDialog(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    prepareSaveEntity(): Entity {
        const saveEntity = {
            ...this.entityForm.value
        };

        if (this.entity && this.entity._id) {
            saveEntity._id = this.entityItem._id;
        }

        return saveEntity;
    }

    handleModalText() {
        if (this.isUpdate) {
            return {
                title: `Alteração`,
                message: 'Item alterado com sucesso!',
                detail: `O item ${this.entityItem._id} foi alterado na variável ${this.entity.name}.`,
                disableNew: true
            };
        }

        return {
            title: `Item adicionado`,
            message: 'Novo item adicionado',
            detail: `O item ${this.entityItem._id} foi adicionado a variável ${this.entity.name}.`,
        };
    }

    openDialog(data): void {
        const initialState = {
            ...this.handleModalText(),
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

    changeVariable(): void {
        this.rebuildForm();
    }

    newEntity(): void {
        this.isUpdate = false;
        this.entityItem = {};
        this.createForm();
        this.route.navigate([`/admin/${this.entityType}/${this.entity._id}/add`]);
    }

    goToList(): void {
        this.route.navigate([`/admin/${this.entityType}/${this.entity._id}`]);
    }

    revert() {
        this.rebuildForm();
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
    }
}
