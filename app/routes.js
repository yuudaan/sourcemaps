'use strict';

const Router = require('koa-router');
const miscController = require('./controllers/misc');
const sourcemapsController = require('./controllers/sourcemaps');

const router = new Router();
router.get('/', miscController.getApiInfo);
router.get('/sourcemaps/*', sourcemapsController.verifyHeader);

module.exports = router;
