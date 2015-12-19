var fs = require('fs');
module.exports = function(clientId, accessToken) {
	fs.writeFile('./.env', 'CLIENT_ID=' + clientId + '\nACESS_TOKEN=' + accessToken, function(err) {
		if (err) return console.log(err);
		console.log('suksex');
	})
	console.log(clientId + accessToken);
}