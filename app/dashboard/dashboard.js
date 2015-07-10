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

		// App.buildPolling is set by the App.ApplicationRoute globally for the entire app.
		self._buildsInterval = setInterval(function () {
			controller.updateBuilds();
		}, App.buildPolling);

		// App.projectRotation is set by the App.ApplicationRoute globally for the entire app.
		self._projectsInterval = setInterval(function () {
			controller.nextProject();
		}, App.projectRotation);

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

		// Get all failed projects.
		var filtered = projects.filter(function(project) {
			return project.successful === false;
		});

		var hasFailures = filtered.length !== 0;
		this.set('hasFailures', hasFailures);

		// If there are no failures, filter the current list of projects to those selected for the dashboard.
		if (!hasFailures) {
			filtered = projects.filter(function(project) {
				return App.dashboardProjects.indexOf(project.id) > -1;
			});
		}

		if (filtered.length === 0) return;

		var current = this.get('current');
		if(!current){
			current = filtered[0];
			Ember.set(current, 'isActive', true);
			this.set('current', current);
		}

		this.set('projects', filtered);
	}.observes('model').on('init')

	,nextProject: function() {
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
