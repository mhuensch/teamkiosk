// ---------------------------------------------------------------------------------------------------------------------
// SETTINGS CLIENT
// This file should contain all the additional logic for App.Settings.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('settings');
});


App.SettingsRoute = Ember.Route.extend({
	model: function() {
		return {
			buildPolling: App.Settings.buildPolling
			,projectRotation: App.Settings.projectRotation
		};
	}
});


App.SettingsController = Ember.Controller.extend({
	onBuildPollingChanged: function() {
		var model = this.get('model');
		localStorage.setItem('buildPolling', model.buildPolling);
		App.Settings.buildPolling =  model.buildPolling;
	}.observes('model.buildPolling')
	
	,onProjectRotationChanged: function() {
		var model = this.get('model');
		localStorage.setItem('projectRotation', model.projectRotation);
		App.Settings.projectRotation =  model.projectRotation;
	}.observes('model.projectRotation')
});


App.Settings = {
	buildPolling: localStorage.getItem('buildPolling')        || 5000
	,projectRotation: localStorage.getItem('projectRotation') || 5000
}