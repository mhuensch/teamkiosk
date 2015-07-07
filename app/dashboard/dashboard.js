// ---------------------------------------------------------------------------------------------------------------------
// DASHBOARD CLIENT
// This file should contain all the additional logic for App.Dashboard.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('dashboard');
});


App.DashboardRoute = Ember.Route.extend({
	_projectsInterval: null
	,_buildsInterval: null

	,model: function(params) {
		var self = this;
		var controller = self.controllerFor('dashboard');

		var result = controller.updateBuilds();

		self._buildsInterval = setInterval(function () {
			controller.updateBuilds();
		}, 2000); // TODO: read this time from configuration.

		self._projectsInterval = setInterval(function () {
			controller.nextProject();
		}, 2000); // TODO: read this time from configuration.

		return result;
	}

	,deactivate: function() {
		var controller = this.controllerFor('dashboard');
		controller.set('current', null)

		clearInterval(this._buildsInterval);
		clearInterval(this._projectsInterval);
		this._super();
	}
});


App.DashboardController = Ember.Controller.extend({

	itemSize: function() {
		if (!this.projects) return 0;
		var percent = 1/this.projects.length * 100;
		var result = "width: " + percent + "%"
		result = Handlebars.Utils.escapeExpression(result);
		return result.htmlSafe();
	}.property('projects.@each')

	,onModelChanged: function() {
		var projects = this.get('model');
		if (!projects) return;

		var filtered = projects.filter(function(project){
			if (project.successful !== false) return;
			return project;
		});

		var hasFailures = true;
		if (filtered.length === 0) {
			hasFailures = false;
			// TODO: filter projects to favorites
			filtered = projects;
		}

		var current = this.get('current');
		if(!current){
			current = filtered[0];
			Ember.set(current, 'isActive', true);
			this.set('current', current);
		}
		this.set('hasFailures', hasFailures);
		this.set('projects', filtered);
	}.observes('model').on('init')

	,nextProject: function() {
		// TODO: fix bug where first project is skipped when moving from broken builds to fixed builds
		var projects = this.get('projects');
		if (!projects) return;

		var current = this.get('current');
		if (!current) return;

		var currentIndex = projects.indexOf(current);
		if (currentIndex < 0) {
			currentIndex = projects.length-1;
		}

		currentIndex++;
		if (currentIndex >= projects.length || !current) {
			currentIndex = 0;
		}

		this.set('current', projects[currentIndex]);
	}

	,onCurrentChanged: function() {
		var projects = this.get('projects');
		if (!projects) return;

		projects.forEach(function(project){
			Ember.set(project, 'isActive', false);
		});

		var current = this.get('current');
		if (!current) return;

		Ember.set(current, 'isActive', true);
	}.observes('current')

	,updateBuilds: function() {
		var self = this;

		return App.ProjectsApi.query().then(function(changes){

			var hadFailures = self.get('hasFailures');
			var hasFailures = changes.some(function(change){
				return change.successful === false;
			});

			if(hasFailures !== hadFailures) {
				self.set('current', null);
			}

			self.set('builds', changes.slice(0, 3));
			self.set('model', changes);
		})
	}
});
