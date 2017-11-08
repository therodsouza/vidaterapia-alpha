var Contributor = require('../model/contributor');

var contributors  = {
    "data": []
}

exports.contributor_list = function(req, res) {
    Contributor.find(null, ['name', 'surname', 'phone', 'rg', 'cpf', 'formacao', 'cep'] , function(err, results) {
		contributors.data = results;
	});

    res.json(contributors);
}

exports.contributor_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Contributor detail: ' + req.params.id);
}

exports.contributor_create_post = function(req, res) {
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
}
