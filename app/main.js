var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var contributors  = {
	"data": []
};

var contributorSchema = new mongoose.Schema({
	id: Number,
	name: String,
	surname: String,
	email: String,
	phone: String,
	bank: String,
	branch: Number,
	account: Number,
	accounttype: String,
	rg: Number,
	cpf: Number,
	contrato: String,
	formacao: String,
	dn: String,
	cep: Number,
	tags: String
});

var Contributor = mongoose.model('Contributor', contributorSchema);

mongoose.connect('mongodb://localhost:27017/vidaterapia');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");

  Contributor.find(null, ['name', 'surname', 'phone', 'rg', 'cpf', 'formacao', 'cep'] , function(err, results) {
	contributors.data = results;
  });
});

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("./app"));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.get("/colaboradores", function(req, res) {
	Contributor.find(null, ['name', 'surname', 'phone', 'rg', 'cpf', 'formacao', 'cep'] , function(err, results) {
		contributors.data = results;
	});

	res.json(contributors);
});

// POST /login gets urlencoded bodies
app.post('/colaboradores', urlencodedParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	
	console.log(req.body); 

	var contributor = new Contributor({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		phone: req.body.phone,
		bank: req.body.bank,
		branch: req.body.branch,
		account: req.body.account,
		accounttype: req.body.accounttype,
		rg: req.body.rg,
		cpf: req.body.cpf,
		contrato: req.body.contrato,
		formacao: req.body.formacao,
		dn: req.body.dn,
		cep: req.body.cep,
		tags: req.body.tags
    });

    contributor.save(function(err) {
        if (err)
           throw err;
        else 
		   console.log('save user successfully...');
	});
	
	res.sendStatus(200);
})

app.listen(8080);

console.log("Express app running on port 8080");

module.exports = app;