App.Router.map(function () {
	this.resource('configuration');
});

App.ConfigurationRoute = Ember.Route.extend({

	model: function (params, route) {
		return App.ConfigurationApi.query().then(function(configuration){
			var result = {
				repository: configuration.repository,
				projects: configuration.favorites.map( function(favorite) {
				})
			};

			return App.ProjectsApi.query().then(function(projects) {
				projects.project.map(function(project){
					result.projects.push({
						id: project.id,
						alias: project.alias
					});
				});
				return result;
			});

		});
	}

});

// App.ConfigurationController = Ember.Controller.extend(
// 	handleClick: function(key, value) {
// 		console.log(key, value, 'here');
// 		return 'blah'y
// 	}.property('id')
// )

App.ConfigurationApi = Api.create({
	url: '/configuration'
});
