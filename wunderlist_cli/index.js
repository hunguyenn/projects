#! /usr/bin/env node

var request = require('request');
var auth = require('./auth.js');
var env = require('node-env-file');
var fs = require('fs');

// put in try catch -> need to authorize if gets in catch
env(__dirname + '/.env');

switch (process.argv[2]) {
	case "auth":
		auth(process.argv[3], process.argv[4]);
		break;
	default:
		
		console.log(process.env.CLIENT_ID);
}



// auth -> set environment variables





// supported commands
// authorize
// avatar -> converts your pic into text characters
// handle command line arguments in one method
// each command gets their own file
