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
        message.channel.send(json.compendium.item[i].text);
      }
    }
    
  } else if(type == 2) {
    // spells

    for(var i = 0; i < Object.keys(json.compendium.spell).length; i++) {
      var query = json.compendium.spell[i][field].toString().toLowerCase();

      if(query === search) {
        message.channel.send(json.compendium.spell[i].text);
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