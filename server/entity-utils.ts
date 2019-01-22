import * as mongoose from 'mongoose';
import * as express from 'express';
import * as removeRoute from 'express-remove-route';
import {capitalize, camelCase, lowerCase} from 'lodash';

import {EntityType} from './models/entity-type';
import {EntityTypeJoker} from './models/entity-type-joker';
import {EntityTypeJokerCtrl} from './controllers/entity-type-joker';
import {EntityJoker} from './models/entity-joker';
import {EntityJokerCtrl} from './controllers/entity-joker';

// TODO remover criação de Schemas e CRUDs

/**
 * Classe de utilitários com múltiplas funções para:
 * - Manipulação de dados;
 * - Criação de Schemas e CRUDS
 *
 * Índice:
 * -
 */
export class EntityUtils {
    static app: any;

    constructor() {}

    static handleEntityTypeDynamicCRUD(data: EntityType | EntityType[]) {
        if (data instanceof Array) {
            data.forEach((el) => {
                EntityUtils.handleEntityTypeItemDynamicCRUD(el);
            });
        } else {
            EntityUtils.handleEntityTypeItemDynamicCRUD(data);
        }
    }

    static updateEntityTypeDynamicCRUD(oldElem: EntityType, elem: EntityType, controller: any) {
        EntityUtils.updateDBConfigDynamicEntity(oldElem, elem);
    }

    private static async handleEntityTypeItemDynamicCRUD(elem) {
        const entityTypeJoker = new EntityTypeJoker();
        const model = entityTypeJoker.createSchema(elem);
        const controller = new EntityTypeJokerCtrl(model);

        EntityUtils.createRoutes(elem, controller);

        const docs = await model.find({});
        EntityUtils.handleEntityDynamicCRUD(docs);
    }

    static handleEntityDynamicCRUD(data: object | object[]) {
        if (data instanceof Array) {
            data.forEach((el) => {
                EntityUtils.handleEntityItemDynamicCRUD(el);
            });
        } else {
            EntityUtils.handleEntityItemDynamicCRUD(data);
        }
    }

    private static handleEntityItemDynamicCRUD(elem) {
        const schema = new EntityJoker(elem).createSchema();
        const controller = new EntityJokerCtrl(schema);

        EntityUtils.createRoutes(elem, controller);
    }

    static createRoutes(elem, controller) {
        const router = EntityUtils.initiateCRUDMethods(controller);

        this.app.use(`/api/${elem.route}`, router);
    }

    static updateRoutes(route: string, elem: any, controller) {
        removeRoute(route);
        this.createRoutes(elem, controller);
    }

    static initiateCRUDMethods(ctrl: any, route?: string) {
        const router = express.Router();
        const r = route ? '/' + route : '';

        if (route === 'users') {
            router.route(`${r}/login`).get(ctrl.login);
        }

        router.route(`${r}/`).get(ctrl.getAll);
        router.route(`${r}/count`).get(ctrl.count);
        router.route(`${r}/`).post(ctrl.insert);

        if (ctrl.documentation) {
            router.route(`${r}/doc`).get(ctrl.getDocumentation);
        }

        router.route(`${r}/:id`).get(ctrl.get);
        router.route(`${r}/:id`).patch(ctrl.update);
        router.route(`${r}/:id`).delete(ctrl.delete);

        return router;
    }

    static changeEntityMongoose(oldElem, elem) {
        console.log(oldElem, elem);
        /*console.log(mongoose.models[oldElem.machineName]);

        mongoose.models[elem.machineName] = mongoose.models[oldElem.machineName];
        mongoose.connection.collections[camelCase(elem.name)] = mongoose.connection.collections[camelCase(oldElem.name)];
        mongoose.modelSchemas[elem.machineName] = mongoose.modelSchemas[oldElem.machineName];*/
    }


    static deleteEntityMongoose(elem) {
        delete mongoose.models[elem.system.model];
        delete mongoose.connection.collections[elem.system.collection];
        delete mongoose.modelSchemas[elem.system.model];
    }

    static removeCollectionEntityMongoose(entities) {
        // TODO REMOVER ENTIDADE

        console.log('removeCollectionEntityMongoose', entities);
        /*entities.entities.forEach((el) => {});*/
    }

    static updateDBConfigDynamicEntity(oldElem, elem) {
        EntityUtils.changeEntityMongoose(oldElem, elem);
        EntityUtils.deleteEntityMongoose(oldElem);
    }

    static deleteDynamicEntity(elem) {
        try {
            const collection = mongoose.model(elem.system.model).collection;

            // TODO CLONE / RENAME ENTITY BEFORE REMOVE FROM DB
            collection.drop();

            EntityUtils.deleteEntityMongoose(elem);
        } catch (err) {
            console.log(err);
        }
    }
}

export function initiateUtilsApp(app) {
    EntityUtils.app = app;
}
