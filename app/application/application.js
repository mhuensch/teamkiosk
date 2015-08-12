// ---------------------------------------------------------------------------------------------------------------------
// APPLICATION CLIENT
// This file should contain all the additional logic for App.Application.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions to App (see app/index.js) or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		return  new Ember.RSVP.Promise(function (resolve, reject) {
			App.SettingsApi.query().then(function(settings){
				App.ProjectsApi.query().then(function(projects){
					resolve({
						settings: settings
						,projects: projects
					});
				})
			});
		});
	}

	,afterModel: function(model) {
		// Normally we would wait for the settings controller to be called before loading a model.  However, 
		// as we want the settings availiable to the entire application (routes, controllers, etc.)
		// we are setting the controller value here.
		this.controllerFor('settings').set('model', model.settings);

		// We would also wait for the projects to be set by a call to the projects controller.  However,
		// as the call is so expensive, we are "pre-loading" the projects and then updating them based on changes.
		this.controllerFor('projects').set('model', model.projects);
	}

	,setupController: function(controller, model) {
		// This method has been left intentionally empty
		// We are not setting anything here from the models above, 
		// as the application controller should not contain any model.
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

