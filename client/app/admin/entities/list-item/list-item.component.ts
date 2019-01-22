import { camelCase } from 'lodash';

import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Entity} from '../../../models/entity';
import {EntityItemService} from '../../../core/services/entity-item.service';
import {UtilsService} from '../../../core/services/utils.service';
import {EntitiesService} from '../../../core/services/entities.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {EntityTypeService} from '../../../core/services/entity-type.service';

@Component({
    selector: 'tk-entity-list',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListEntityItemComponent implements OnInit {
    entityItemToDelete: any;
    entityItemList: any[] = [];
    columns: Entity[] = [];
    entityType: string;
    entityID: string;
    entity: Entity;
    loading: boolean;
    deleteModal: BsModalRef;

    constructor(
        private entityTypeService: EntityTypeService,
        private entityService: EntitiesService,
        private entityItemService: EntityItemService,
        private utilsService: UtilsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService
    ) {
        this.activatedRoute.parent.params.subscribe((params: Params) => {
            this.entityType = params['entityType'];
            if (this.entityType) {
                this.loading = true;

                this.activatedRoute.params.subscribe((p: Params) => {
                    this.entityID = p.id;

                    if (p.id) {
                        this.getEntityTypeAndEntity();
                    }
                });
            }
        });
    }


    ngOnInit() {

    }

    getEntityTypeAndEntity() {
        this.entityTypeService.get(this.entityType, this.entityID)
            .subscribe((data) => {
                this.entity = data;
                this.columns = this.handleColumns(data);
                this.getEntityList();
            });
    }

    getEntityList() {
        this.entityService.list(this.entity.route)
            .subscribe((data) => {
                this.entityItemList = data;
            });
    }

    handleColumns(entity) {
        let arr = [];

        entity.formSchema
            .forEach((elem) => {
                if (elem.onDatatable) {
                    arr.push(elem);
                }
            });

        return arr;
    }

    handleElementInfo(element, column) {
        return element[camelCase(column.name)];
    }

    deleteEntity(entity, template: TemplateRef<any>) {
        this.deleteModal = this.modalService.show(template);
        this.entityItemToDelete = entity;
    }

    confirmDeleteEntity() {
        this.entityService.delete(this.entity.route, this.entityItemToDelete._id)
            .subscribe(
                data => {
                    this.entityItemList = this.utilsService.removeFromArray(this.entityItemList, {_id: this.entityItemToDelete._id});
                    this.deleteModal.hide();
                },
                err => console.log(err)
            );
    }

    addNewItem() {
        this.router.navigate([`/admin/entities/item/${this.entityID}/add`]);
    }

    listItems(id) {
        console.log(id);
    }
}
