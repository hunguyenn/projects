module.exports = function(listNum) {
	var fs = require('fs');
	var request = require('request');
	var list_ = require(__dirname + '/list.js');
	var listJson = JSON.parse(fs.readFileSync(__dirname + '/.lists'));
	var list = listJson[listNum];
	var revision = list['revision'];
	var id = list['id'];
	var title = list['title'];
	var options = {
		method: 'DELETE',
		url: 'https://a.wunderlist.com/api/v1/lists/' + id,
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID,
		},
		qs: {'revision': revision},
	}

	request(options, function(err, res, body) {
		if (err === null && res.statusCode === 204) {
			list_();
		}
	});
}