#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var list = require('./list.js');
var add = require('./add.js');
var comp = require('./comp.js');
var addList = require('./addList.js');
var displayList = require('./displayList');
var setDefault = require('./setDefault');
var env = require('node-env-file');
var fs = require('fs');

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
		if (process.argv.length === 5) {
			add(process.argv[3], process.argv[4]);
		} else {
			add(process.env.DEFAULT_ID, process.argv[3]);
		}
		break;
	case "comp":
		comp(process.argv[3]);
		break;
	case "addList":
		addList(process.argv[3]);
		break;
	case "setDefault":
		setDefault(process.argv[3]);
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
// set default list -> donezo

// print out after add, complete, etc
// put print in separate module
// format printing the tasks
// put whole switch-case in a try-catch -> in case of error, print out usage

// offline version
// -> sync back to online on command