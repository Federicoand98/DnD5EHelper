const embedMaker = require('./utils/embed_maker.js');

function roll(message, Client) {
    var separatori = ['\\\+', ' '];
    var sub = message.content.substr(2);
    var elem = sub.split(new RegExp(separatori.join('|'), 'g'));
    var result = 0;
    var dice, rnd, modifier = 0;
    var embedDesc = "[d";
    var embed = new Client.MessageEmbed().setColor('#0099ff');

    console.log("roll: " + roll + "\n");
    console.log("elem: " + elem);

    if(Number.isNaN(Number.parseInt(elem[0]))) {
		result = "Quello che hai inserito non è un numero rollabile, ouch";
    } else if(!Number.isNaN(Number.parseInt(elem[0]))) {
		var roll = Math.floor(Math.random() * Number.parseInt(elem[0])) + 1;
		console.log("FRoll: " + roll);
		result = roll;
		embedDesc += Number.parseInt(elem[0]) + " = " + roll + "] ";
		if(roll == 1) {
			embed.setColor('#F32929');
			var n = Math.floor(Math.random() * 3) + 1;
			if(n == 1) {
				embed.setImage('https://img0.etsystatic.com/054/0/5922228/il_570xN.760525250_3vls.jpg');
			} else if(n == 2) {
				embed.setImage('https://ih0.redbubble.net/image.407172373.0114/raf,750x1000,075,t,fafafa:ca443f4786.u1.jpg');
			} else if(n == 3) {
				embed.setImage('https://ih1.redbubble.net/image.47620142.8990/flat,550x550,075,f.u6.jpg');
			}
		} else if(roll == 20) {
			embed.setColor('#E4F329').setImage('https://webstockreview.net/images/d20-clipart-critical-hit-8.png');
		}
    }

    if(elem.length > 1) {
		for(var i = 1; i < elem.length; i++) {
			if(!Number.isNaN(Number.parseInt(elem[i])) && !elem[i].includes('d')) {
				modifier = Number.parseInt(elem[i]);
				console.log("Mod: " + modifier);
				result += Number.parseInt(modifier);
			} else if(elem[i].includes('d')) {
				if(elem[i].startsWith('d')) {
					dice = Number.parseInt(elem[i].substr(1));
					rnd = Math.floor(Math.random() * dice) + 1;
					result += rnd;
					embedDesc += "[d " + dice + " = " + rnd + "] ";
					console.log("Roll: " + rnd);
				} else {
					var multiRoll = elem[i].split('d');
					for(var y = 0; y < Number.parseInt(multiRoll[0]); y++) {
						rnd = Math.floor(Math.random() * Number.parseInt(multiRoll[1])) + 1;
						result += rnd;
						embedDesc += "[d" + Number.parseInt(multiRoll[1]) + " = " + rnd + "] ";
						console.log("MRoll: " + rnd);
					}
				}
			}
		}
	}

	if(modifier != 0) {
		embedDesc += "[" + modifier + "]";
	}

    embed.setTitle(result)
    .setDescription(embedDesc)
    .setFooter('D&D 5E Helper created by Federico Andrucci');

    message.channel.send(embed);
}

function m_roll(message, Client) {
    var separatori = ['\\\+', ' '];
    var sub = message.content.substr(1);
    var elem = sub.split(new RegExp(separatori.join('|'), 'g'));
    var result = 0;
    var dice, rnd, modifier = 0;
    var embedDesc = "";
    var embed = new Client.MessageEmbed().setColor('#0099ff');

    if(elem[0].includes('d')) {
		var s = elem[0].split('d');

		for(var i = 0; i < Number.parseInt(s[0]); i++) {
			rnd = Math.floor(Math.random() * Number.parseInt(s[1])) + 1;
			result += rnd;
			embedDesc += "[d" + Number.parseInt(s[1]) + " = " + rnd + "] ";
		}
	}

    if(elem.length > 1) {
		for(var i = 1; i < elem.length; i++) {
			if(!Number.isNaN(Number.parseInt(elem[i])) && !elem[i].includes('d')) {
				modifier = Number.parseInt(elem[i]);
				console.log("Mod: " + modifier);
				result += Number.parseInt(modifier);
			} else if(elem[i].includes('d')) {
				if(elem[i].startsWith('d')) {
					dice = Number.parseInt(elem[i].substr(1));
					rnd = Math.floor(Math.random() * dice) + 1;
					result += rnd;
					embedDesc += "[d " + dice + " = " + rnd + "] ";
					console.log("Roll: " + rnd);
				} else {
					var multiRoll = elem[i].split('d');
					for(var y = 0; y < Number.parseInt(multiRoll[0]); y++) {
						rnd = Math.floor(Math.random() * Number.parseInt(multiRoll[1])) + 1;
						result += rnd;
						embedDesc += "[d" + Number.parseInt(multiRoll[1]) + " = " + rnd + "] ";
						console.log("MRoll: " + rnd);
					}
				}
			}
		}
    }

    if(modifier != 0) {
		embedDesc += "[" + modifier + "]";
	}

    embed.setTitle(result)
    .setDescription(embedDesc)
    .setFooter('D&D 5E Helper created by Federico Andrucci');

    message.channel.send(embed);
}


function searchIntoJson(type, field, search, message, json, Client) {
    if(type == 1) {
    // items
		for(var i = 0; i < Object.keys(json.compendium.item).length; i++) {
			var query = json.compendium.item[i][field].toString().toLowerCase();
			if(query === search) {
				message.channel.send(embedMaker(json.compendium.item[i], 1, Client));
			}
		}
    } else if(type == 2) {
    // spells
		for(var i = 0; i < Object.keys(json.compendium.spell).length; i++) {
			var query = json.compendium.spell[i][field].toString().toLowerCase();
			if(query === search) {
				message.channel.send(embedMaker(json.compendium.spell[i], 2, Client));
			}
		}
    } else if(type == 3) {
    // monsters


    }
}



module.exports = {
	searchIntoJson,
	roll,
	m_roll
}