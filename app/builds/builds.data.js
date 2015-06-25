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

	var dateNear = function() {

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

		build.coverage.total = Math.ceil((
			+build.coverage.classes
			+ +build.coverage.methods
			+ +build.coverage.statements
		)/3);

		result.push(build);
	}

	return result;
}();
