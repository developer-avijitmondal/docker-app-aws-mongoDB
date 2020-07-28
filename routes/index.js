var express = require('express');
var router = express.Router();
// const { 
//   getAll, createNew, deleteAll, 
//   getOne, updateOne, deleteOne,createHTML 
// } = require('../services/appService');
const appService = require('../services/appService');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({title: 'Node.js App'});
// });

// router.post('/create-html',async (req, res, next) => {
//   //const { status, error, type, result , total} = await createHTML(req.body);
//   const response = await createHTML(req.body);
//   // return res.status(status).json({ error, type, total, result });
//   console.log(response);
// });

router.post('/',appService.htmlCreation);

router.get('/',appService.getAll);

router.delete('/:title',appService.deleteOne);

module.exports = router;
