var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument =require('../swagger/swagger.json');
const swaggerDocument =require('../../swagger/swagger.json');

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;