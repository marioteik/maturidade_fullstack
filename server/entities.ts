import {EntityTypeCtrl} from './controllers/entity-type';

import {EntityType} from './models/entity-type';
import {EntityUtils} from './entity-utils';
import {cloneDeep} from 'lodash';

export class EntityTypes {
    app: any;
    entityTypeCtrl = new EntityTypeCtrl();

    constructor(app) {
        this.app = app;
    }

    initEntities() {
        this.entityTypeCtrl.getAllRuntime().then(
            (data: EntityType[]) => EntityUtils.handleEntityTypeDynamicCRUD(data)
        );
    }
}

export function handleEntityTypes(app) {
    new EntityTypes(app).initEntities();
}
