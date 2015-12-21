module.exports = function(listId, task) {
	var fs = require('fs');
	var request = require('request');
	var listJson = JSON.parse(fs.readFileSync('./.lists'));
	var options = {
		method: 'POST',
		url: 'https://a.wunderlist.com/api/v1/tasks',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
			'Content-Type': 'application/json',
		},
		json: {'list_id': listJson[listId]['id'], 'title': task},
	}
	request(options, function(err, res, body) {
		console.log(body);
	});
}