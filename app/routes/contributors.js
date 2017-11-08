var express = require('express');
var router = express.Router();
var contributorController = require('../controllers/contributorController');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/colaboradores', contributorController.contributor_list);

router.post('/colaborador', urlencodedParser, contributorController.contributor_create_post);

module.exports = router;