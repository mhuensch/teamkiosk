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
