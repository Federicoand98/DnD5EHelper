const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(''));

app.listen(port, () => console.log(""));

/*--------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------*/

const Client = require("discord.js");
const client = new Client.Client();

const xml2js = require('xml2js');
const fs = require('fs');

const commands = require('./commands.js');

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

	}
});