var http = require('http');

function httpGet(path, callback, delay) {
	delay = delay || 0;
	setTimeout(function(){
		http.get({
			host:'teamcity.codebetter.com',  // TODO: read this from some configuration file
			port: 80,
			path: path,
			method: 'GET',
			headers: {'Accept': 'application/json'}
		}, function(result) {
			var chunks = "";
			result.on('data', function (chunk) {
				chunks += chunk
			}).on('end', function(){
				if (chunks.indexOf('Error') !== 0) {
					callback(JSON.parse(chunks));
				} else {
					// TODO: Do something other than this.
					callback(null);
				}
			});
		});
	}, delay);
}



module.exports = {
	getBuildTypes: function (callback) {
		httpGet('/guestAuth/app/rest/buildTypes?fields=buildType(id,name,href)', function(result){
			callback(result.buildType)
		});
	}

	,getBuildsByBuildType: function(callback) {
		var result = [];

		var href = '/guestAuth/app/rest/builds/buildType:';

		this.getBuildTypes(function(projects){
			for(var i=0; i<projects.length; i++){

				var id = projects[i].id;
				var name = projects[i].name;
				httpGet(href + id, function(info){
					result.push({
						id: id
						,name: name
						,info: info
					});

					if (result.length === projects.length) {
						callback(result);
					}
				}, i*10);
			}
		});
	}

	,getBuildStatistics: function (buildId, callback) {
		httpGet('/guestAuth/app/rest/builds/id:'+buildId+'/statistics', function(result){
			callback(result)
		});
	}
}