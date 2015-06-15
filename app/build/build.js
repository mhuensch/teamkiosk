App.Router.map(function () {
	this.resource('build', { path: '/builds/:key' });
});

App.BuildRoute = Ember.Route.extend({

	model: function (params) {

		var params = {
			key: params.key
		};

		return App.BuildsApi.query(params).then(function (data) {
			return data[0]
		});

	}

});
