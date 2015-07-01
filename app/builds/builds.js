// ---------------------------------------------------------------------------------------------------------------------
// BUILDS CLIENT
// This file should contain all the additional logic for App.Builds.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('builds');
});


App.BuildsApi = Api.create({
	url: '/builds'
});


App.BuildsRoute = Ember.Route.extend({
	model: function() {
		return App.BuildsApi.query();
	}
});


App.BuildsController = Ember.Controller.extend({
	onModelChanged: function() {
		var builds = this.get('model');
		if (!builds) return;

		builds.forEach(function(build) {
			Ember.set(build, 'failed', build.status === 'failed');
		})
	}.observes('model').on('init')
});
