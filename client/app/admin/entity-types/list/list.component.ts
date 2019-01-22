import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';
import {Entity} from '../../../models/entity';
import {RuntimeVariablesService} from '../../../core/services/runtime-variables.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {EntityType} from '../../../models/entity-type';

@Component({
    selector: 'tk-entity-type-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class EntityTypeListComponent implements OnInit {
    public entityTypes: EntityType[] = [];
    deleteModal: BsModalRef;
    entityTypeToDelete: Entity;

    constructor(
        private contextHandler: ContextHandlerService,
        private runtimeVariables: RuntimeVariablesService,
        private modalService: BsModalService
    ) {
        this.contextHandler.getContext<EntityType[]>('runtime.entityTypes').subscribe(
            (data) => {
                this.entityTypes = data;
            }
        );
    }

    ngOnInit() {
        this.updateEntityTypes();
    }

    updateEntityTypes() {
        this.runtimeVariables.getOrUpdateEntityTypes();
    }

    selectToUpdate(entityId) {
        this.runtimeVariables.selectEntityTypeToUpdate(entityId);
    }

    deleteEntity(entity, template: TemplateRef<any>) {
        this.deleteModal = this.modalService.show(template);
        this.entityTypeToDelete = entity;
    }

    confirmDeleteEntityType() {
        this.runtimeVariables.deleteEntityType(this.entityTypeToDelete._id);
        this.deleteModal.hide();
    }

    addItem(id) {
        console.log(id);
    }

    listItems(id) {
        console.log(id);
    }
}
