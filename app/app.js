'use strict';

const Koa = require('koa');
const requestId = require('@kasa/koa-request-id');
const { logger: createLogger } = require('koa2-winston');
const bodyParser = require('./middlewares/body-parser');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const corsConfig = require('./config/cors');
const router = require('./routes');
const logger = require('./logger');

class App extends Koa {
    constructor(...params) {
        super(...params);

        // Trust proxy
        this.proxy = true;
        // Disable `console.errors` except development env
        this.silent = this.env !== 'development';

        this.servers = [];

        this._configureMiddlewares();
        this._configureRoutes();
    }

    _configureMiddlewares() {
        this.use(errorHandler());
        this.use(requestId());
        this.use(createLogger({ logger }));
        this.use(
            bodyParser({
                enableTypes: ['json'],
                jsonLimit: '10mb'
            })
        );
        this.use(
            cors({
                origins: corsConfig.origins,
                allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
                allowHeaders: ['Content-Type', 'Authorization'],
                exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
            })
        );
    }

    _configureRoutes() {
        // Bootstrap application router
        this.use(router.routes());
        this.use(router.allowedMethods());
    }

    listen(...args) {
        const server = super.listen(...args);
        this.servers.push(server);
        return server;
    }

    async terminate() {
        // TODO: Implement graceful shutdown with pending request counter
        for (const server of this.servers) {
            server.close();
        }
    }
}

module.exports = App;
