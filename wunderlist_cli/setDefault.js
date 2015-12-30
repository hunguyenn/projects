module.exports = function(defaultId) {
	var fs = require('fs');
	var env = require('node-env-file');
	env(__dirname + '/.env');
	var clientId = process.env.CLIENT_ID;
	var accessToken = process.env.ACCESS_TOKEN;
	fs.unlink(__dirname + '/.env');
	fs.open(__dirname + '/.env', 'w', function(err, res, body) {
		fs.appendFile(__dirname + '/.env', 'CLIENT_ID=' + clientId +'\nACCESS_TOKEN=' + accessToken +'\nDEFAULT_ID=' + defaultId);
	})
}