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
		this._updateProjectOptions();
	}.observes('settings.ignoredProjects.@each', 'settings.dashboardProjects.@each').on('init')

	,onIsDirtyChanged:function(){
		clearTimeout(this.saveTimeout);
		console.log('changed!');
		// if(!this.get('isDirty')) return;

		// var projects = this.get('model');
		// if(!projects) return;

		// var settings = self.get('settings');
		// if(!settings) return;

		// settings.dashboardProjects.clear();
		// settings.ignoredProjects.clear();
		// for(var i = 0; i < settings.length; i++) {
		// }

		console.log('yup its dirty')
	}.observes('isDirty')

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
