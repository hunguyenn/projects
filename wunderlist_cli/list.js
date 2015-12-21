module.exports = function() {
	var request = require('request');
	var fs = require('fs');
	var options = {
		url: 'https://a.wunderlist.com/api/v1/lists',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
		}
	}

	request(options, function(err, res, body) {
		var lists = JSON.parse(body); 
		if (!err && res.statusCode === 200) {
			var i = 0;
			var json = {};
			lists.forEach(function(list) {
				json[i] =  {'title' : list['title'], 'id' : list['id']};
				console.log('[' + i++ + '] ' + list['title']);
				fs.open('./.lists', 'w', function(err, fd) {
					if (err) console.log('Unable to create \'.lists\' file');
					fs.writeFile('./.lists', JSON.stringify(json), function(err) {
						if (err) return console.log('Unable to write to \'.lists\' file');
					});
				});
			});
		} else {
			console.log('code: ', res.statusCode);
		}
	});
}