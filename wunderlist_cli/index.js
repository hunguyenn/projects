#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var list = require('./list.js');
var add = require('./add.js');
var comp = require('./comp.js');
var addList = require('./addList.js');
var displayList = require('./displayList');
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
}

// usage
// auth - clientId , accessToken

// add task to list -> donezo
// add a list -> donezo
// complete a task -> donezo
// set default list
// default list is default to add to / display if no list is specified