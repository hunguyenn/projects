module.exports = function(listNum) {
	if (listNum === undefined) {
		listNum = process.env.DEFAULT_ID;
	}
	var fs = require('fs');
	var request = require('request');
	// check if process.argv[2] is undefined
	// if no lists, tell them to call wunder list
	var listJson = JSON.parse(fs.readFileSync('./.lists'));
	// console.log("Default: " + JSON.stringify(listJson));
	var id = listJson[listNum]['id'];

	var options = {
		url: 'https://a.wunderlist.com/api/v1/tasks',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
		},
		qs: {'list_id': id},
	}

	request(options, function(err, res, body) {
		var resp = JSON.parse(body);
		if (resp['invalid_request']) {
			console.log('Unsuccessful authentication.');
		} else {
			console.log(listJson[listNum]['title']);
			var i = 0;
			var json = {};
			resp.forEach(function(task) {
				json[i] = {'revision': task['revision'], 'title': task['title'], 'id': task['id'], 'list_id': task['list_id']};
				console.log('[' + i++ + '] ' + task['title']);
			});
			fs.open('./.tasks', 'w', function(err, fd) {
				if (err) console.log('Unable to create \'.tasks\' file');
				fs.writeFile('./.tasks', JSON.stringify(json), function(err) {
					if (err) console.log('Unable to write to \'.tasks\' file');
				});
			});
		}
	});
}