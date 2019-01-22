import * as express from 'express';

import { EntityUtils } from './entity-utils';
import { EntityTypeCtrl } from './controllers/entity-type';

function setRoutes(app) {
    const router = EntityUtils.initiateCRUDMethods(new EntityTypeCtrl(), 'entity-types');

    // Apply the routes to our application with the prefix /api
    app.use('/api', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    app.use('/api', router);
}

export { setRoutes };
