import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
// import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import {json, urlencoded} from 'body-parser';
import {load} from 'dotenv';
import {join} from 'path';
import {createServer, Server} from 'http';

// import * as schema from './schemas/schema';

import {setRoutes} from './routes';
import {handleEntityTypes} from './entities';
import {initiateUtilsApp} from './entity-utils';

class AppServer {
    public static readonly PORT: number = 8080;
    public static readonly DIST_FOLDER: string = join(__dirname, '../');
    public static readonly PUBLIC_FOLDER: string = join(AppServer.DIST_FOLDER, 'public');

    private app: express.Application;
    private server: Server;
    private mongodb;
    private port: string | number;
    private mongodbURI: string;

    constructor() {
        // get .env file for enviromniment
        load({path: '.env'});

        this.createApp();
        this.config();
        this.configMongoDB();
        this.createServer();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT_SERVER || AppServer.PORT;

        this.app.use(cors());
        this.app.use('/', express.static(AppServer.PUBLIC_FOLDER));
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));
    }

    private configMongoDB() {
        if (process.env.NODE_ENV === 'test') {
            this.mongodbURI = process.env.MONGODB_TEST_URI;
        } else {
            this.mongodbURI = process.env.MONGODB_URI;
            this.app.use(morgan('dev'));
        }

        mongoose.Promise = global.Promise;
        this.mongodb = mongoose.connect(this.mongodbURI);
    }

    private listen(): void {
        this.mongodb
            .then(db => {
                console.log('Connected to MongoDB');

                initiateUtilsApp(this.app);
                setRoutes(this.app);
                handleEntityTypes(this.app);

                /*this.app.use('/graphql', graphqlHTTP({
                    schema,
                    graphiql: true
                }));*/

                this.app.get('/', (req, res) => {
                    res.sendFile(join(AppServer.PUBLIC_FOLDER, 'index.html'));
                });

                this.server.listen(this.port, () => {
                    console.log('MMS listening on port ' + this.port);
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    public getApp(): express.Application {
        return this.app;
    }
}

export {AppServer};
