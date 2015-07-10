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


App.ProjectsController = Ember.Controller.extend(App.PropertyWatcher, {

	onModelChanged: function() {
		var self = this;
		var projects = self.get('model');
		if (!projects) return;

		projects.forEach(function(project) {
			Ember.set(project, 'failed', project.successful === false);
			Ember.set(project, 'inDashboard', App.dashboardProjects.indexOf(project.id) > -1);
			Ember.set(project, 'ignored', App.ignoredProjects.indexOf(project.id) > -1);
		})

		this.watch(projects, [
			'inDashboard',
			'ignored'
		]);
	}.observes('model').on('init')

	,propertyChanged: function() {
		console.log('property changed!');
	}

	,onIsDirtyChanged: function() {
		console.log('isDirty?', this.isDirty);
	}.observes('isDirty')

});


	// ,onAnythingSelected: function(){
	// 	var projects = this.get('model');
	// 	if (!projects) return;

	// 	var selected = projects.some(function(project){
	// 		return project.isSelected;
	// 	})

	// }.observes('model.@each.isSelected')


	// 	onModelChanged: function() {
	// 	var model = this.get('model');
	// 	if (!model) return;

	// 	// Here we are watching the properties on the object explicitly.
	// 	// If we wanted notifications per property [propertyChanged(name, current, previous)] or observe isDirty.
	// 	this.watch(model, [
	// 		'buildPolling',
	// 		'projectRotation'
	// 	]);
	// }.observes('model')