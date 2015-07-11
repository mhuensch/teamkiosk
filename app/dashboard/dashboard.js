// ---------------------------------------------------------------------------------------------------------------------
// DASHBOARD CLIENT
// This file should contain all the additional logic for App.Dashboard.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('dashboard');
});


App.DashboardRoute = Ember.Route.extend({
	model: function(params) {
		return this.controllerFor('dashboard').updateBuilds();
	}

	,setupController: function(controller, model) {
		controller.set('model', model);
		controller.beginInterval();
	}

	,deactivate: function() {
		this.controllerFor('dashboard').clear();
		this._super();
	}
});


App.DashboardController = Ember.Controller.extend({
	needs: 'settings'
	,settings: Ember.computed.alias('controllers.settings.model')
	,_projectsInterval: null
	,_buildsInterval: null

	,itemSize: function() {
		if (!this.projects) return 0;
		var percent = 1/this.projects.length * 100;
		var result = "width: " + percent + "%"
		result = Handlebars.Utils.escapeExpression(result);
		return result.htmlSafe();
	}.property('projects.@each')

	,onModelChanged: function() {
		var self = this;
		var projects = self.get('model');
		if (!projects) return;

		// Get all failed projects.
		var filtered = projects.filter(function(project) {
			return project.successful === false;
		});

		var hasFailures = filtered.length !== 0;
		self.set('hasFailures', hasFailures);

		var settings = self.get('settings');
		// If there are no failures, filter the current list of projects to those selected for the dashboard.
		if (!hasFailures) {
			filtered = projects.filter(function(project) {
				return settings.dashboardProjects.indexOf(project.id) > -1;
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

	,beginInterval: function() {
		var self = this;
		var settings = self.get('settings');

		if (settings.buildPolling) {
			self._buildsInterval = setInterval(function () {
				self.updateBuilds();
			}, settings.buildPolling);
		}

		if (settings.projectRotation) {
			self._projectsInterval = setInterval(function () {
				self.nextProject();
			}, settings.projectRotation);
		}
	}
	
	,clear: function() {
		this.set('current', null)
		clearInterval(this._buildsInterval);
		clearInterval(this._projectsInterval);
	}
});
