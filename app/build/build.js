// ---------------------------------------------------------------------------------------------------------------------
// BUILD CLIENT
// This file should contain all the additional logic for App.Build.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('build', { path: '/builds/:id' });
});


App.BuildRoute = Ember.Route.extend({
	model: function(params) {
		return App.BuildsApi.read(params.id);
	}
});


App.BuildController = Ember.Controller.extend({
	time: function(){
		var ticks = this.get('model.duration');
		var hh = Math.floor( ticks / 3600);
		var mm = Math.floor( (ticks % 3600) / 60);
		var ss = (ticks % 3600) % 60;

		var result = '';
		if (hh) result = result + hh + "h ";
		if (mm) result = result + mm + "m "
		if (ss) result = result + ss + 's';
		return result;
	}.property('model.duration')
});
