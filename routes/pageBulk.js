var express = require('express');
var router = express.Router();

const pageService = require('../services/pageService');

router.post('/',pageService.bulkupdate);

module.exports = router;