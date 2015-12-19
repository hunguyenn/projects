module.exports = function() {
	var request = require('request');
	var options = {
		url: 'https://a.wunderlist.com/api/v1/lists',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID
		}
	}

	request(options, function(err, res, body) {
		var lists = JSON.parse(body); 
		if (!err && res.statusCode === 200) {
			console.log(lists);
		} else {
			console.log('code: ', res.statusCode);
		}
	});
}