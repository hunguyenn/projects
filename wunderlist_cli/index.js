#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var list = require('./list.js');
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
	default:
		console.log("Default: " + process.argv[2]);

}

// usage
// auth - clientId , accessToken

// list updates local reperesntation of lists
// supported commands
// authorize
// avatar -> converts your pic into text characters
// handle command line arguments in one method
// each command gets their own file
