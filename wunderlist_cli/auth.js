var fs = require('fs');
var request = require('request');

module.exports = function(clientId, accessToken) {
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
			console.log('Unsuccessful authentication. Please try again.');
		} else {
			console.log('Successfully authenticated. \n\tName: ' + resp['name'] + "\n\tEmail: " + resp['email']);
			fs.open('./.env', 'w', function(err, fd) {
				if (err) console.log('Unable to create \'.env\' file');
				fs.writeFile('./.env', 'CLIENT_ID=' + clientId + '\nACCESS_TOKEN=' + accessToken, function(err) {
					if (err) return console.log('Unable to write to \'.env\' file');
				});
			});
		}
	});






	// fs.writeFile('./.env', 'CLIENT_ID=' + clientId + '\nACCESS_TOKEN=' + accessToken, function(err) {
	// 	if (err) return console.log(err);

	// 	console.log('Succesfully authenticated.');
	// })
}