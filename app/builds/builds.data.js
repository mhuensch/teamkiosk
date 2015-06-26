// ---------------------------------------------------------------------------------------------------------------------
// BUILDS DATA
// This file allows the generation of mock test data for use during UI first development using Pyre.  Additionally,
// this data is "re-generated" in a pseudo random fashion each time the browser is refreshed.  Finally, a few test
// methods are included to simulate the changing of data on the server.
// ---------------------------------------------------------------------------------------------------------------------

window.Data = window.Data || [];
window.Data['/builds'] = function() {

	var randomStatus = function() {
		if (Math.random() < .75) return 'success';
		return 'failure';
	}

	var numberNear = function(seed, offset) {
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		var offset = Math.random() * offset * plusOrMinus;
		var result = offset + seed;
		if (result > 100) result = 100;
		if (result < 0) result = 0;

		return result;
	}

	var result = [];
	for(var i=0; i<25; ++i) {

		var today = new Date();
		var coverageSeed = Math.random() * 100;
		var dateSeed = (new Date()).setHours(
			Math.floor(new Date().getHours() - Math.random() * 100)
		);

		var build = {
			"id":"TestApp" + i
			,"name":"Test_App_"+i
			,"duration": Math.floor((Math.random() * 1000))
			,"queuedOn": dateSeed
			,"startedOn": dateSeed
			,"finishedOn": dateSeed
			,"status": 'success'
			,"coverage": {
				"total": 0
				,"classes": numberNear(coverageSeed, 10).toFixed(2)
				,"methods": numberNear(coverageSeed, 10).toFixed(2)
				,"statements": numberNear(coverageSeed, 10).toFixed(2)
			}
			,"lastChange": {
				"id": 1
				,"by": "someuser"
				,"on": dateSeed
			}
			,"durationHistory": [
				,{"duration": Math.floor((Math.random() * 100000)), "status": 'success'}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "status": randomStatus()}
			]
		};

		build.coverage.total = (
			+build.coverage.classes
			+ +build.coverage.methods
			+ +build.coverage.statements
		)/3;

		result.push(build);
	}

	return result;
}();


window.Data.addBuild = function(status) {
	status = status || 'success'
	window.Data['/builds'].unshift(
		{
			"id":"TestApp" + window.Data['/builds'].length
			,"name":"Test_App_" + window.Data['/builds'].length
			,"duration": Math.floor((Math.random() * 1000))
			,"queuedOn": new Date()

			,"status": status
			,"coverage": {
				"classes": (Math.random() * 100).toFixed(2),
				"methods": (Math.random() * 100).toFixed(2),
				"statements": (Math.random() * 100).toFixed(2)
			}
			,"lastChange": {
				"id": 1
				,"by": "someuser"
				,"on": new Date()
			}
		}
	)
};


window.Data.clearFailures = function() {
	window.Data['/builds'] = window.Data['/builds'].filter(function(build){
		if (build.status === 'failed') return;
		return build;
	});
};
