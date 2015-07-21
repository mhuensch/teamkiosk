var teamcity = require('./teamcity.js');

module.exports = {
	route: '/projects'

	,get: function (req, res) {
		teamcity.getBuildsByBuildType(function(data) {
			var result = [];

			console.log(data.length);
			for(var i=0; i<data.length; i++) {

				var build = data[i];

				if (!build.info) {
					result.push({
						id: build.id
						,successful: null
						,queuedDate: null
						,startDate: null
						,finishDate: null
						,lastChange: null
					});
					continue;
				}

				var buildData = build.info;

				var item = {
					id: buildData.buildType.id
					,name: buildData.buildType.name
					,buildId: buildData.id
					,queuedDate: buildData.queuedDate
					,startDate: buildData.startDate
					,finishDate: buildData.finishDate
				};

				if (buildData.status === "SUCCESS") {
					item.successful = true;
				} else if (buildData.status === "FAILURE") {
					item.successful = false;
				} else {
					item.successful = null;
				}

				if (buildData.lastChanges && buildData.lastChanges.change[0]) {
					item.lastChanges = {
						by: buildData.lastChanges.change[0].username
					}
				}

				result.push(item);
			}

			res.json(result);
		});
	}
}