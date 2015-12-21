#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var list = require('./list.js');
var add = require('./add.js');
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
	default:
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
				resp.forEach(function(task) {
					console.log('    ' + task['title']);
				});
			}
		});
}

// usage
// auth - clientId , accessToken

// add task to list
// add a list
// complete a task

// list updates local reperesntation of lists
// supported commands
// authorize
// avatar -> converts your pic into text characters
// handle command line arguments in one method
// each command gets their own file
