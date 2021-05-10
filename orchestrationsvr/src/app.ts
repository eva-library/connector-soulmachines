import * as express from 'express';
import * as bodyParser from 'body-parser';


class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }
 
    private config() {
        // support application/json
        this.app.use(bodyParser.json());
    }

}

export default new App().app;
