// ---------------------------------------------------------------------------------------------------------------------
// APPLICATION CLIENT
// This file should contain all the additional logic for App.Application.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions to App (see app/index.js) or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		return App.SettingsApi.query();
	}

	,afterModel: function(model) {
		App.set('buildPolling', model.buildPolling);
		App.set('projectRotation', model.projectRotation);
		App.set('dashboardProjects', [
			'TestApp0'
			,'TestApp1'
			,'TestApp2'
		]);
		App.set('ignoredProjects', [
			'TestApp3'
		]);
	}

	,actions: {
		willTransition: function(transition) {
			$('#application-nav-trigger').prop("checked", false);
			return true;
		}
	}
})

App.ApplicationView = Ember.View.extend({
	// Add the 'main' class to our primary ember view.
	classNames: ['application']

	,didInsertElement: function() {
		$('.header > ul > li > a').click(function(){
			 $('#application-nav-trigger').prop("checked", false);
		});
	}
});

