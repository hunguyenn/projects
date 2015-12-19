module.exports = function() {
	var request = require('request');
	var options = {
		url: 'https://a.wunderlist.com/api/v1/user',
		headers: {
			'X-Access-Token': process.env.ACCESS_TOKEN,
			'X-Client-ID': process.env.CLIENT_ID
		}
	}

	request(options, function(err, res, body) {
		var lists = JSON.parse(body); // is actually the error message in case of err
		if (!err && res.statusCode === 200) {
			// res.send(lists);
			console.log(res.statusCode);
			console.log(lists);
		} else {
			console.log('code: ', res.statusCode);
			console.log(lists);
		}
	});
}