module.exports = function(clientId, accessToken) {
	var fs = require('fs');
	var request = require('request');
	var options = {
		url: 'https://a.wunderlist.com/api/v1/user',
		headers: {
			'X-Access-Token': accessToken,
			'X-Client-ID': clientId
		}
	}

	request(options, function(err, res, body) {
		var resp = JSON.parse(body);
		if (resp['invalid_request']) {
			console.log('Unsuccessful authentication.');
		} else {
			console.log('Successfully authenticated. \n\tName: ' + resp['name'] + "\n\tEmail: " + resp['email']);
			fs.open(__dirname + '/.env', 'w', function(err, fd) {
				if (err) console.log('Unable to create \'.env\' file');
				fs.writeFile(__dirname + '/.env', 'CLIENT_ID=' + clientId + '\nACCESS_TOKEN=' + accessToken, function(err) {
					if (err) return console.log('Unable to write to \'.env\' file');
				});
			});
		}
	});
}