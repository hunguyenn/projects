module.exports = function(defaultId) {
	var fs = require('fs');
	fs.appendFile('./.env', '\nDEFAULT_ID=' + defaultId);
}