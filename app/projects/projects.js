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
	needs: 'settings'
	,settings: Ember.computed.alias('controllers.settings.model')
	,saveTimeout: null

	,onModelChanged: function() {
		this._updateProjectOptions();
	}.observes('model').on('init')

	,onSettingsChanged: function() {
		var settings = this.get('settings');
		if (!settings) return;

		this.watch(settings, [
			'ignoredProjects.@each'
			,'dashboardProjects.@each'
		]);
	}.observes('settings').on('init')

	,onSettingsOptionChanged:function() {
		// Rather than use something like observes(isDirty) we are attaching the auto save to property change.
		// This is because isDirty will not fire after the model is already dirty, so subsequent changes,
		// after the first, may not be included.
		var self = this;

		// We clear the previous timout immidately, because we don't want to end up running multiple saves.
		clearTimeout(self.saveTimeout);

		// By delaying the change for 1 second, we 'debounce' the save function.  This can be very important
		// when auto-saving rapid changes from user input fields.
		self.saveTimeout = setTimeout(function() {
			App.SettingsApi.save(self.get('settings')).then(function(settings){
				if(self.hasChanges(self.current, settings)) return;
				self.watch(settings);
			});
		}, 1000);

		this._updateProjectOptions();
	}.observes('settings.ignoredProjects.@each', 'settings.dashboardProjects.@each').on('init')

	,_updateProjectOptions: function() {
		var self = this;
		var projects = self.get('model');
		if (!projects) return;

		var settings = self.get('settings');
		projects.forEach(function(project) {
			Ember.set(project, 'failed', project.successful === false);
			Ember.set(project, 'inDashboard', settings.dashboardProjects.indexOf(project.id) > -1);
			Ember.set(project, 'ignored', settings.ignoredProjects.indexOf(project.id) > -1);
		});
	}

	,_setProjectOption: function(id, value, target, remove) {
		var settings = this.get('settings');
		if (!settings) return

		var targetList = settings[target];
		var removeFromList = settings[remove];

		if (value) {
			targetList.pushObject(id);
			var index = removeFromList.indexOf(id);
			if (index === -1) return;
			removeFromList.removeAt(index);
		} else {
			targetList.removeAt(targetList.indexOf(id));
		}
	}

	,actions: {
		toggleInDashboard: function (project) {
			this._setProjectOption(project.id, !project.inDashboard, 'dashboardProjects', 'ignoredProjects');
		}

		,toggleIgnored: function (project) {
			this._setProjectOption(project.id, !project.ignored, 'ignoredProjects', 'dashboardProjects');
		}
	}
});
