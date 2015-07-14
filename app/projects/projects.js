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
	needs: 'settings'
	,settings: Ember.computed.alias('controllers.settings.model')

	,onModelChanged: function() {
		var self = this;
		var projects = self.get('model');
		if (!projects) return;

		var settings = self.get('settings');
		projects.forEach(function(project) {
			Ember.set(project, 'failed', project.successful === false);
			Ember.set(project, 'inDashboard', settings.dashboardProjects.indexOf(project.id) > -1);
			Ember.set(project, 'ignored', settings.ignoredProjects.indexOf(project.id) > -1);
		});

	}.observes('model').on('init')
});
