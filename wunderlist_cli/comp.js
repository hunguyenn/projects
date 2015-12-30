module.exports = function(taskId) {
	var fs = require('fs');
	var request = require('request');
	var displayTasks = require(__dirname + '/displayTasks.js');
	var tasks = JSON.parse(fs.readFileSync(__dirname + '/.tasks'));
	var listId = tasks[0]['list_id'];
	var listNum = tasks[0]['list_num'];
	var task = tasks[taskId];
	var revision = task['revision'];

	var options = {
		method: 'PATCH',
		url: 'https://a.wunderlist.com/api/v1/tasks/' + task['id'],
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
		},
		qs: {'list_id': listId},
		json: {'revision': revision, 'completed': true}
	}

	request(options, function(err, res, body) {
		if (res.statusCode === 200) {
			displayTasks(listNum);
		}
	});
}