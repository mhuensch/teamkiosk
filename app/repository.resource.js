// TODO: read this from some sort of config file
var rootUrl = 'teamcity.codebetter.com';
var http = require('http');
var fs = require('fs');

try {
	repository = require('./repository.override.js');
	module.exports = repository;
	console.log('Repository set to override');
	return;
} catch(err) {
	console.log(err);
	console.log('No override present');
}

var options = {
	host: rootUrl,
	port: 80,
	path: '/guestAuth/app/rest',
	method: 'GET',
	headers: {'Accept': 'application/json'}
};

module.exports = {

	get: function(path, callback) {
		var newOptions = JSON.parse(JSON.stringify(options));
		newOptions.path = newOptions.path + path;
		http.get(newOptions, function(res) {
			var data = "";
			res.on('data', function (chunk) {
				data += chunk
			}).on('end', function(){
				console.log(data);
				callback(JSON.parse(data));
			});
		});
	}

};
