module.exports = function(name) {
	var request = require('request');
	var options = {
		method: 'POST',
		url: 'https://a.wunderlist.com/api/v1/lists',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
		},
		json: {'title': name}
	}
	request(options, function(err, res, body) {
		console.log('Successfully added list.');
	});
}