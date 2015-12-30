module.exports = function(task) {
	var fs = require('fs');
	var taskJson = JSON.parse(fs.readFileSync(__dirname + '/.tasks'));
	var listId = taskJson[0]['list_num'];
	var request = require('request');
	var displayTasks = require(__dirname + '/displayTasks.js');
	var listJson = JSON.parse(fs.readFileSync(__dirname + '/.lists'));
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
		displayTasks(listId);
	});
}