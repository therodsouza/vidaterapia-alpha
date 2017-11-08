var mongoose = require('mongoose');

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

module.exports = mongoose.model('Contributor', contributorSchema);