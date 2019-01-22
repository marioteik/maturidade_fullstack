import {Injectable} from '@angular/core';
import {ContextHandlerService} from '../../context-handler/services/context-handler.service';
import {cloneDeep, camelCase} from 'lodash';
import {Entity} from '../../models/entity';
import {EntitiesService} from './entities.service';
import {UtilsService} from './utils.service';
import {EntityTypeService} from './entity-type.service';
import {EntityType} from '../../models/entity-type';
import {diff} from 'deep-diff';

import {finalize} from 'rxjs/operators';
import {DeepArray, kind} from '../../models/deep-diff';

export interface IRuntimeVariables {
    [key: string]: Array<any>;
    entityTypes: Array<EntityType>;
}

@Injectable({
    providedIn: 'root'
})
export class RuntimeVariablesService {
    public runtime: IRuntimeVariables = {
        entityTypes: [],
    };

    gettingEntities: any = {};
    gettingEntityTypes = false;

    constructor(
        private contextHandler: ContextHandlerService,
        private entitiesService: EntitiesService,
        private entityTypesService: EntityTypeService,
        private utilsService: UtilsService
    ) {
    }

    init() {
        this.updateRuntime();
        this.getOrUpdateEntityTypes();
    }

    updateRuntime() {
        this.contextHandler.updateValue('runtime', this.runtime);
    }

    // TODO função para lógica ao baixar novas atualizações de entidades pelos tipos de entidades
    handleEntityTypesDiff(oldEntityTypes) {
        const diffs: DeepArray[] = diff(oldEntityTypes, this.runtime.entityTypes) || [];

        diffs.forEach((el: DeepArray) => {
            if (el && el.item && el.item.kind === 'N') {
                //console.log(el.item);
            }
        });
    }

    updateRuntimeEntityTypes(entityTypes) {
        const oldEntityTypes = cloneDeep(this.runtime.entityTypes);

        this.runtime.entityTypes = entityTypes;
        this.contextHandler.updateValue('runtime.entityTypes', entityTypes);
        this.gettingEntityTypes = false;

        this.handleEntityTypesDiff(oldEntityTypes);
    }

    /**
     * Atualiza entidade criada ou editada na lista
     * @param entityType
     */
    updateEntityTypesByOne(entityType: EntityType) {
        let entityTypes = cloneDeep(this.runtime.entityTypes);
        const hasEntityTypes = this.utilsService.findByKey(entityTypes, '_id', entityType._id);

        if (hasEntityTypes) {
            entityTypes = this.utilsService.findByKeyAndReplace(entityTypes, '_id', entityType);
            this.updateRuntimeEntityTypes(entityTypes);
        } else {
            this.updateRuntimeEntityTypes([...entityTypes, entityType]);
        }
    }

    selectEntityTypeToUpdate(id) {
        const entityType = this.utilsService.findByKey(this.runtime.entityTypes, '_id', id);
        this.contextHandler.updateValue('entityType', entityType);
    }

    updateRuntimeEntities(entities, path) {
        this.runtime[path] = entities;
        this.contextHandler.updateValue(`runtime.${path}`, entities);
        this.gettingEntities[path] = false;
    }

    // todo unir os 2 próximos métodos
    getOrUpdateEntityTypes() {
        if (!this.gettingEntityTypes) {
            this.gettingEntityTypes = true;

            this.entityTypesService
                .list()
                .pipe(
                    finalize(() => {
                        this.gettingEntityTypes = false;
                    })
                )
                .subscribe(
                    (entities: Entity[]) => this.updateRuntimeEntityTypes(entities),
                    error => console.log('Não foi possível carregar as entidades')
                );
        }
    }

    getOrUpdateEntities(route?: string, path?: string) {
        const p = path ? path : camelCase(route);

        if (!this.gettingEntities[p]) {
            this.gettingEntities[p] = true;

            this.entitiesService
                .list(route)
                .pipe(
                    finalize(() => {
                        this.gettingEntities[p] = false;
                    })
                )
                .subscribe(
                    (entities: Entity[]) => this.updateRuntimeEntities(entities, p),
                    error => console.log('Não foi possível carregar as entidades')
                );
        }
    }

    // todo unir esses últimos 2 métodos
    deleteEntityType(id) {
        let _entityTypes = this.runtime.entityTypes;

        this.entityTypesService.delete(id)
            .subscribe(
                data => {
                    _entityTypes = this.utilsService.removeFromArray(_entityTypes, {_id: id});
                    this.updateRuntimeEntityTypes(_entityTypes);
                },
                err => console.log(err)
            );
    }

    deleteEntity(entity) {
        const entityTypeRoute = cloneDeep(entity.route).split('/')[0];
        const entityName = camelCase(entityTypeRoute);

        let _entities = this.runtime[entityName] || [];

        this.entitiesService.delete(entity._id, entityTypeRoute)
            .subscribe(
                data => {
                    _entities = this.utilsService.removeFromArray(_entities, {_id: entity._id});
                    this.updateRuntimeEntities(_entities, entityName);
                    console.log(this.runtime);
                },
                err => console.log(err)
            );
    }
}
