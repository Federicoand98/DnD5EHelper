require('dotenv').config();
const express = require('express');
const xml2js = require('xml2js');
const Client = require("discord.js");
const fs = require('fs');
const commands = require('./commands.js');
const PRomise = require('bluebird');
const AppDAO = require('./dao/dao');
const TestRepository = require('./dao/test_repository');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(''));

app.listen(port, () => console.log(""));

/*--------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------*/

const client = new Client.Client();

var json;
var res;

client.login(process.env.TOKEN);

client.once('ready', () => {
	const xml = fs.readFileSync('core.xml');
	const parser = new xml2js.Parser();

	xml2js.parseString(xml, {mergeAttrs: true}, (err, result) => {
		if(err) {
			console.log(err);
			throw err;
		}

		res = JSON.stringify(result, null , 4);
		json = JSON.parse(res);
	});

	console.log("Online");

	main();
});

client.on('message', message => {
	var parts = message.content.split(" ");
	var search = parts.slice(1).join(" ");
	var field = "name";
	var embed;

	if(parts[0] === "!item") {

		commands.searchIntoJson(1, field, search, message, json, Client);

	} else if(parts[0] === "!spell") {

		commands.searchIntoJson(2, field, search, message, json, Client);

	} else if(parts[0] == "!monster") {

		commands.searchIntoJson(3, field, search, message, json, Client);

	} else if(message.content.startsWith('!d')) {

		commands.roll(message, Client);
    
	} else if(message.content.indexOf('d') == 2) {
    
		commands.m_roll(message, Client);

	} else if(parts[0] === "!setup") {

	} else if(parts[0] === "!get") {

	}
});

function main() {
	const dao = new AppDAO('./database.sqlite3');
	const testRepo = new TestRepository(dao);
	const testData = { name: 'This is a test' };
	let testId;

	testRepo.createTable()
		.then(() => testRepo.create(testData.name))
		.then(() => testRepo.getAll())
		.then((tests) => {
			console.log('\nRetreived project from database');
			
			tests.forEach(element => {
				console.log('\nId: ' + element.id);
				console.log('Name: ' + element.name);
			});
		}).catch((err) => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
		});
}