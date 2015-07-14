var http = require('http');
var fs = require('fs');

var rootUrl = 'teamcity.codebetter.com';
var options = {
	host: rootUrl,
	port: 80,
	path: '/guestAuth/app/rest/buildTypes?fields=buildType(id,name)',
	method: 'GET',
	headers: {'Accept': 'application/json'}
};


module.exports = {
	route: '/projects'

	,get: function (req, res) {

		// http.get(options, function(result) {
		// 	var projectData = "";
		// 	result.on('data', function (chunk) {
		// 		projectData += chunk
		// 	}).on('end', function(){
				
		// 		var buildTypes = JSON.parse(projectData).buildType;
				
		// 		var newOptions = JSON.parse(JSON.stringify(options));
		// 		newOptions.path = '/guestAuth/app/rest/builds?count=1000&project=Builds&fields=build(id,buildTypeId,status,state)';
		// 		http.get(newOptions, function(result) {
		// 			var statusData = '';
		// 			result.on('data', function (newChunk) {
		// 				statusData += newChunk
		// 			}).on('end', function(){
		// 				var statuses = JSON.parse(statusData).build;

		// 				var result = [];
		// 				for(var i =0; i<buildTypes.length; i++) {
		// 					var project = buildTypes[i];
		// 					var found = statuses.filter(function(status) {
		// 						if(status.buildTypeId === project.id) return status;
		// 					})[0];

		// 					if (!found) continue;
		// 					console.log('found', found);
		// 					// var xoptions = JSON.parse(JSON.stringify(options));
		// 					// xoptions.path = '/guestAuth/app/rest/builds/buildType:' + project.id;
		// 					// http.get(xoptions, function(result) {
		// 					// 	var projectData = "";
		// 					// 	result.on('data', function (chunk) {
		// 					// 		projectData += chunk
		// 					// 	}).on('end', function(){
		// 					// 		var buildData = JSON.parse(projectData);

		// 					// 		if (buildData.statusText === "SUCCESS") {
		// 					// 			project.successful = true;
		// 					// 		} else if (buildData.statusText === "FAILURE") {
		// 					// 			project.successful = false;
		// 					// 		}

		// 					// 		console.log(buildData.queuedDate);
		// 					// 		console.log(buildData.startDate);
		// 					// 		console.log(buildData.finishDate);
		// 					// 		if (buildData.lastChanges && buildData.lastChanges.change[0]) {
		// 					// 			console.log(buildData.lastChanges.change[0].username);
		// 					// 		}
		// 					// 	})

								
		// 					// });

		// 					result.push(project);
		// 				}

		// 				res.json(statuses);


		// 			})
		// 		});
		// 	});
		// });
		res.json([]);
	}

	,post: function (model) {
		// body...
	}

	,delete: function (id) {

	}
}