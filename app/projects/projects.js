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


// App.ProjectsController = Ember.Controller.extend(App.PropertyWatcher, {
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

		// this.watch(projects, [ 'inDashboard', 'ignored' ]);
	}.observes('model').on('init')

	// ,actions: {
	// 	save: function(argument) {
	// 		var self = this;
	// 		var model = self.get('model');
	// 		var settings = self.get('settings');

	// 		var dashboardProjects = model.map(function(project) {
	// 			if (project.inDashboard === false) return;
	// 			return project.id;
	// 		})
	// 		Ember.set(settings, 'dashboardProjects', dashboardProjects);


	// 		var ignoredProjects = model.map(function(project) {
	// 			if (project.ignored === false) return;
	// 			return project.id;
	// 		})
	// 		Ember.set(settings, 'ignoredProjects', ignoredProjects);


	// 		self.set('saving', true);
	// 		self.get('controllers.settings').saveSettings(settings).then(function(result) {
	// 			// As we are already watching the properties needed, 
	// 			// we only need to submit the result for re-watch
	// 			self.watch(self.get('model'));
	// 			self.set('saving', false);
	// 		});
	// 	}
	// }
});
