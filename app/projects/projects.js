// ---------------------------------------------------------------------------------------------------------------------
// PROJECTS CLIENT
// This file should contain all the additional logic for App.Projects.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('projects');
});


App.ProjectsApi = Api.create({
	url: '/projects'
});


App.ProjectsRoute = Ember.Route.extend({
	model: function() {
		return App.ProjectsApi.query();
	}
});


App.ProjectsController = Ember.Controller.extend({
	onModelChanged: function() {
		var projects = this.get('model');
		if (!projects) return;

		projects.forEach(function(project) {
			Ember.set(project, 'failed', project.successful === false);
		})
	}.observes('model').on('init')
});
