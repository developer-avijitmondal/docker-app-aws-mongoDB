var express = require('express');
var router = express.Router();

const pageService = require('../services/pageService');

router.post('/',pageService.create);

router.get('/',pageService.getAll);

// router.put('/',pageService.bulkupdate);

// router.post('/',pageService.bulkupdate);

router.get('/:id',pageService.getOne);

// router.put('/:id',pageService.updateOne);

router.put('/:section_id',pageService.updateOne);

router.delete('/:id',pageService.deleteOne);

module.exports = router;
