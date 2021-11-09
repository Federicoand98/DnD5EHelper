function itemEmbed(item, Client) {
	var embed = new Client.MessageEmbed();

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
}

function monsterEmbed(item, Client) {
	
}

function spellEmbed(spell, Client) {
    var embed = new Client.MessageEmbed();

	embed.setColor('#0099ff')
		.setTitle(spell.name)
		.addFields(
			{ name: 'Level', value: spell.level, inline: true },
			{ name: 'School', value: spell.school, inline: true },
			{ name: 'Ritual', value: spell.ritual, inline: true },
			{ name: 'Time', value: spell.time, inline: true },
			{ name: 'Range', value: spell.range, inline: true },
			{ name: 'Components', value: spell.components, inline: true },
			{ name: 'Duration', value: spell.duration, inline: true },
			{ name: 'Classes', value: spell.classes, inline: true },
		);

	if(item.text.toString().length > 1024) {
		if(item.text.toString().length > 2048) {
			embed
				.addField('Description', spell.text.toString().substring(0, 1024), false)
				.addField('.', spell.text.toString().substring(1024, 2048), false)
				.addField('.', spell.text.toString().substring(2048, spell.text.toString().length), false)
				.setFooter('D&D 5E Helper created by Federico Andrucci');
		} else {
			embed
				.addField('Description', spell.text.toString().substring(0, 1024), false)
				.addField('.', spell.text.toString().substring(1024, spell.text.toString().length), false)
				.setFooter('D&D 5E Helper created by Federico Andrucci');
		}
	} else {
		embed
			.addField('Description', spell.text, false)
			.setFooter('D&D 5E Helper created by Federico Andrucci');
	}
		
	return embed;
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
    classEmbed
}