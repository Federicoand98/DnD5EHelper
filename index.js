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

  
  if(parts[0] === "!item") {
    
    searchIntoJson(1, field, search, message);
  
  } else if(parts[0] === "!spell") {

    searchIntoJson(2, field, search, message);

  } else if(parts[0] == "!monster") {

    searchIntoJson(3, field, search, message);

  }

});

function searchIntoJson(type, field, search, message) {

  if(type == 1) {
    // items
    for(var i = 0; i < Object.keys(json.compendium.item).length; i++) {
      var query = json.compendium.item[i][field].toString().toLowerCase();

      if(query === search) {
        message.channel.send(embedMaker(json.compendium.item[i], 1));
      }
    }
    
  } else if(type == 2) {
    // spells

    for(var i = 0; i < Object.keys(json.compendium.spell).length; i++) {
      var query = json.compendium.spell[i][field].toString().toLowerCase();

      if(query === search) {
        message.channel.send(embedMaker(json.compendium.spell[i], 2));
      }
    }

  } else if(type == 3) {
    // monsters

    /*
    for(var i = 0; i < Object.keys(json.compendium.spell).length; i++) {
      var query = json.compendium.spell[i][field].toString().toLowerCase();

      if(query === search) {
        message.channel.send(json.compendium.spell[i].text);
      }
    }
    */
  }
}

function embedMaker(item, type) {
  var embed;

  if(type == 1) {

    embed = new Client.MessageEmbed()
      .setColor('#0099ff')
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
      ).addField('Description', item.text, false)
      .setFooter('D&D 5E Helper created by CallieTheBard');

    return embed;

  } else if(type == 2) {

    embed = new Client.MessageEmbed()
      .setColor('#0099ff')
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
          embed.addField('Description', item.text.toString().substring(0, 1024), false)
          .addField('.', item.text.toString().substring(1024, 2048), false)
          .addField('.', item.text.toString().substring(2048, item.text.toString().length), false)
          .setFooter('D&D 5E Helper created by CallieTheBard');
        } else {
          embed.addField('Description', item.text.toString().substring(0, 1024), false)
          .addField('.', item.text.toString().substring(1024, item.text.toString().length), false)
          .setFooter('D&D 5E Helper created by CallieTheBard');
        }
    } else {
      embed.addField('Description', item.text, false)
      .setFooter('D&D 5E Helper created by CallieTheBard');
    }
      
    return embed;

  }
}
