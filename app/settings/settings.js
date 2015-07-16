// ---------------------------------------------------------------------------------------------------------------------
// SETTINGS CLIENT
// This file should contain all the additional logic for App.Settings.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
//
// These scripts break from convention in that the route "settings" does not represent an index of settings, but instead
// propertys of the settings for the individual user.  As this is what most users are likely to expect in terms of the 
// route and where most developers are likely to look for "settings" specific logic, we are breaking from the pod 
// conventions we follow in other places in this application.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('settings');
});


App.SettingsRoute = Ember.Route.extend({
	model: function() {
		var self = this;

		// Normally this would return a list of settings not a single setting.
		// See notes in header for more information.
		return  new Ember.RSVP.Promise(function (resolve, reject) {
			App.SettingsApi.query().then(function(settings) {
				App.ProjectsApi.query().then(function(projects) {
					
					projects.forEach(function(project) {
						Ember.set(project, 'inDashboard', settings.dashboardProjects.indexOf(project.id) > -1);
						Ember.set(project, 'ignored', settings.ignoredProjects.indexOf(project.id) > -1);
					});

					self.controllerFor('settings').set('projects', projects);
					resolve(settings);
				});
			});
		});
	}
});


App.SettingsController = Ember.Controller.extend(App.PropertyWatcher, {
	// TODO: Covert ms to seconds
	onModelChanged: function() {
		var model = this.get('model');
		if (!model) return;

		// Here we are watching the properties on the object explicitly.
		// If we wanted notifications per property [propertyChanged(name, current, previous)] or observe isDirty.
		this.watch(model, [
			'buildPolling'
			,'projectRotation'
			,'ignoredProjects.@each'
			,'dashboardProjects.@each'
		]);
	}.observes('model')

	,actions: {
		save: function(argument) {
			var self = this;
			self.set('saving', true);

			var projects = self.get('projects');

			var settings = self.get('model');
			settings.dashboardProjects.clear();
			settings.ignoredProjects.clear();

			projects.forEach(function(project){
				if (project.ignored) {
					settings.ignoredProjects.pushObject(project.id);
				} else if (project.inDashboard) {
					settings.dashboardProjects.pushObject(project.id);
				} else {
					return;
				}
				
			});

			App.SettingsApi.save(settings).then(function(result) {
				// As we are already watching the properties needed, 
				// we only need to submit the result for re-watch
				self.watch(result);
				self.set('saving', false);
			});
		}

		,dashboardChanged: function(value, prefix, postfix) {
			var model = this.get('model');
			var index = model.dashboardProjects.indexOf(postfix);

			if (value && index === -1) {
				model.dashboardProjects.pushObject(postfix);
			} else if (index > -1) {
				model.dashboardProjects.removeAt(index, 1);
			}

			if (!value) return;

			var project = this.get('projects').filter(function(project){
				if (!project.id === postfix) return;
				return project;
			})[0];

		}

		,ignoredChanged: function(value, prefix, postfix) {
			var model = this.get('model');
			var index = model.ignoredProjects.indexOf(postfix);

			if (value && index === -1) {
				model.ignoredProjects.pushObject(postfix);
			} else if (index > -1) {
				model.ignoredProjects.removeAt(index, 1);
			}
		}
	}
});
