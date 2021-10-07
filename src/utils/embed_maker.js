function embedMaker(item, type, Client) {
	var embed = new Client.MessageEmbed();
	if(type == 1) {
		embed.setColor('#0099ff')
			.setTitle(item.name)
			.addFields(
				{ name: 'Type', value: item.type, inline: true },
				{ name: 'Magic', value: item.magic, inline: true },
				{ name: 'Detail', value: item.detail, inline: true },
				{ name: 'Weight', value: item.weight, inline: true },
				{ name: 'AC', value: item.ac, inline: true },
				{ name: 'Roll', value: item.roll, inline: true },
				{ name: 'DMG 1', value: item.dmg1, inline: true },
				{ name: 'DMG Type', value: item.dmgType, inline: true },
			)
			.addField('Description', item.text, false)
			.setFooter('D&D 5E Helper created by Federico Andrucci');
		return embed;
	} else if(type == 2) {
		embed.setColor('#0099ff')
			.setTitle(item.name)
			.addFields(
				{ name: 'Level', value: item.level, inline: true },
				{ name: 'School', value: item.school, inline: true },
				{ name: 'Ritual', value: item.ritual, inline: true },
				{ name: 'Time', value: item.time, inline: true },
				{ name: 'Range', value: item.range, inline: true },
				{ name: 'Components', value: item.components, inline: true },
				{ name: 'Duration', value: item.duration, inline: true },
				{ name: 'Classes', value: item.classes, inline: true },
			);

		if(item.text.toString().length > 1024) {
			if(item.text.toString().length > 2048) {
				embed
					.addField('Description', item.text.toString().substring(0, 1024), false)
					.addField('.', item.text.toString().substring(1024, 2048), false)
					.addField('.', item.text.toString().substring(2048, item.text.toString().length), false)
					.setFooter('D&D 5E Helper created by Federico Andrucci');
			} else {
				embed
					.addField('Description', item.text.toString().substring(0, 1024), false)
					.addField('.', item.text.toString().substring(1024, item.text.toString().length), false)
					.setFooter('D&D 5E Helper created by Federico Andrucci');
			}
		} else {
			embed
				.addField('Description', item.text, false)
				.setFooter('D&D 5E Helper created by Federico Andrucci');
		}
		return embed;
	}
}

function itemEmbed(item, Client) {

}

function monsterEmbed(item, Client) {

}

function spellEmbed(spell, Client) {
    
}

function raceEmbed(race, Client) {

}

function classEmbed(_class, Client) {

}

module.exports = {
    itemEmbed,
    monsterEmbed,
    spellEmbed,
    raceEmbed,
    classEmbed,
    embedMaker
}