#! /usr/bin/env node

var request = require('request');
var auth = require(__dirname + '/auth.js');
var list = require(__dirname + '/list.js');
var add = require(__dirname + '/add.js');
var comp = require(__dirname + '/comp.js');
var addList = require(__dirname + '/addList.js');
var displayTasks = require(__dirname + '/displayTasks');
var setDefault = require(__dirname + '/setDefault');
var del = require(__dirname + '/del.js');
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
		add(process.argv[3]);
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
	case "del":
		del(process.argv[3]);
		break;
	default:
		displayTasks(process.argv[2]);
		break;
}
