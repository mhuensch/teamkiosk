App.Router.map(function () {
	this.resource('builds');
});

App.BuildsApi = Api.create({
	url: '/builds'
});

App.BuildsRoute = Ember.Route.extend({

	model: function (params, route) {
		return App.BuildsApi.query();
	}

});

App.BuildsApiTest = function(status) {
	status = status || 'success'
	window.Data['/builds'].unshift(
		{
			"id":"TestApp" + window.Data['/builds'].length
			,"name":"Test_App_" + window.Data['/builds'].length
			,"duration": Math.floor((Math.random() * 1000))
			,"queuedOn": new Date()
			,"startedOn": new Date()
			,"finishedOn": new Date()
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

App.BuildsApiTestClear = function() {
	window.Data['/builds'] = window.Data['/builds'].filter(function(build){
		if (build.status === 'failed') return;
		return build;
	});
};
