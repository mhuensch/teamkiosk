window.App = Ember.Application.create({
	LOG_TRANSITIONS:           true   // basic logging of successful transitions
	,LOG_TRANSITIONS_INTERNAL: true   // detailed logging of all routing steps
	,LOG_ACTIVE_GENERATION:    true   // log when a controller or route is generated

	,ready: function () {
		MockData.init(); // TODO: move MockData.init() to some place that makes more sense.
		console.log('Application ready');
	}

});


App.IndexRoute = Ember.Route.extend({
	beforeModel: function () {
		this.transitionTo('dashboard');
	}
});


App.LoadingRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('components/loading-window');
	}
});
