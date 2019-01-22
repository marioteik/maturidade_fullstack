import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';
import {Entity} from '../../../models/entity';
import {RuntimeVariablesService} from '../../../core/services/runtime-variables.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute, Params} from '@angular/router';
import {EntitiesService} from '../../../core/services/entities.service';
import {EntityType} from '../../../models/entity-type';

import { camelCase } from 'lodash';

@Component({
    selector: 'tk-entities-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class EntitiesListComponent implements OnInit {
    public entities: Array<Entity> = [];
    deleteModal: BsModalRef;
    entityToDelete: Entity;
    entityRoute: string;
    machineName: string;

    constructor(
        private contextHandler: ContextHandlerService,
        private runtimeVariables: RuntimeVariablesService,
        private entityService: EntitiesService,
        private activatedRoute: ActivatedRoute,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            const entityType = params['entityType'];
            this.entityRoute = entityType ? entityType : this.entityRoute;
            this.machineName = camelCase(this.entityRoute);

            this.contextHandler.getContext(`runtime.${this.machineName}`).subscribe(
                (data: Array<Entity>) => {
                    this.entities = data;
                }
            );

            this.contextHandler.getContext(`runtime`).subscribe(
                (data) => {
                    console.log(data);
                }
            );

            this.updateEntities();
        });
    }

    updateEntities() {
        this.runtimeVariables.getOrUpdateEntities(this.entityRoute, this.machineName);
    }

    deleteEntity(entity, template: TemplateRef<any>) {
        this.deleteModal = this.modalService.show(template);
        this.entityToDelete = entity;
    }

    confirmDeleteEntity() {
        this.runtimeVariables.deleteEntity(this.entityToDelete);
        this.deleteModal.hide();
    }

    addItem(id) {
        console.log(id);
    }

    listItems(id) {
        console.log(id);
    }

}
