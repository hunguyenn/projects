#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var list = require('./list.js');
var add = require('./add.js');
var comp = require('./comp.js');
var addList = require('./addList.js');
var env = require('node-env-file');
var fs = require('fs');

// put in try catch -> need to authorize if gets in catch

if (process.argv[2] !== 'auth') {
	try {
		env(__dirname + '/.env');
	} catch (err) {
		console.log('Need to authenticate.');
	}
}

switch (process.argv[2]) {
	case "auth":
		auth(process.argv[3], process.argv[4]);
		break;
	case "list":
		list();
		break;
	case "add":
		add(process.argv[3], process.argv[4]);
		break;
	case "comp":
		comp(process.argv[3]);
		break;
	case "addList":
		addList(process.argv[3]);
		break;
	default:
		displayList(process.argv[2]);
		break;
		// check if process.argv[2] is undefined
		// if no lists, tell them to call wunder list
		var listJson = JSON.parse(fs.readFileSync('./.lists'));
		// console.log("Default: " + JSON.stringify(listJson));
		var id = listJson[process.argv[2]]['id'];

		var options = {
			url: 'https://a.wunderlist.com/api/v1/tasks',
			headers: {
				'X-Access-Token': process.env.ACCESS_TOKEN,
				'X-Client-ID': process.env.CLIENT_ID,
			},
			qs: {'list_id': id},
		}

		request(options, function(err, res, body) {
			var resp = JSON.parse(body);
			if (resp['invalid_request']) {
				console.log('Unsuccessful authentication.');
			} else {
				console.log(listJson[process.argv[2]]['title']);
				var i = 0;
				var json = {};
				resp.forEach(function(task) {
					json[i] = {'revision': task['revision'], 'title': task['title'], 'id': task['id'], 'list_id': task['list_id']};
					console.log('[' + i++ + '] ' + task['title']);
				});
				fs.open('./.tasks', 'w', function(err, fd) {
					if (err) console.log('Unable to create \'.tasks\' file');
					fs.writeFile('./.tasks', JSON.stringify(json), function(err) {
						if (err) console.log('Unable to write to \'.tasks\' file');
					});
				});
			}
		});
}

// usage
// auth - clientId , accessToken

// add task to list -> donezo
// add a list -> donezo
// complete a task -> donezo
// set default list
// default list is default to add to / display if no list is specified