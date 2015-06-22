App.Router.map(function () {
	this.resource('dashboard');
});

App.DashboardRoute = Ember.Route.extend({

	setupController: function(controller, model) {
		App.FavoritesApi.query().then(function(data){
			controller.set('favorites', data);
			controller.set('selectedId', data[0].id);
		});

		App.BuildsApi.query().then(function(data){
			controller.set('builds', data.slice(0, 5));
		})
	}

});

App.DashboardController = Ember.Controller.extend({

	selectedIdChanged: function() {
		var self = this;

		var oldId = self.get('_oldselectedId');
		if (oldId) self.setActiveFavorite(oldId, false);

		App.BuildsApi.read(self.selectedId).then(function (data) {
			self.set('model', data);
			self.setActiveFavorite(self.selectedId, true);
			self.set('_oldselectedId', self.selectedId)
		});

		Ember.run.later(function () {
			var index = self.get('_index') || 0;
			var favorites = self.get('favorites');

			if (favorites.length === ++index) index=0;

			self.set('_index', index);
			self.set('selectedId', favorites[index].id);
		}, 2000);  // TODO: read this time from configuration.

	}.observes('selectedId'),

	setActiveFavorite: function(currentId, value) {
		var favorite = this.get('favorites').filter(function(obj) {
			if (obj.id === currentId) return true;
			return false;
		})[0];

		Ember.set(favorite, 'isActive', value);
	}

});

// App.ChartView = Ember.View.extend({
// 	templateName: 'charts',

// 	didInsertElement: function() {
// 		var elementId = this.get('elementId');
//         var content = this.get('content');

//         var margin = { top: 35, right: 35, bottom: 35, left: 35};
//         var w = 500 - margin.right - margin.left;
//         var h = 300 - margin.top - margin.top;

//         var x = d3.scale.linear()
//             .range([0,w])
//             .domain([1,content.length]);
//         var y = d3.scale.linear()
//             .range([h,0])
//             .domain([0,100]);
//         var xAxis = d3.svg.axis()
//             .scale(x)
//             .ticks(10)
//             .tickSize(-h)
//             .tickSubdivide(true);
//         var yAxis = d3.svg.axis()
//             .scale(y)
//             .ticks(4)
//             .tickSize(-w)
//             .orient('left');

//         // Prepeare Chart Elements:
//         var line = d3.svg.line()
//             .interpolate('monotone')
//             .x(function(d) { return x(d.get('timestamp'))})
//             .y(function(d) { return y(d.get('value'))});
//         this.set('line',line);

//         var area = d3.svg.area()
//             .interpolate('monotone')
//             .x(function(d) { return x(d.get('timestamp')); })
//             .y0(h)
//             .y1(function(d) { return y(d.get('value')); });
//         this.set('area',area);

//         var chart = d3.select('#'+elementId).append('svg:svg')
//             .attr('id','chart')
//             .attr('width', w+margin.left+margin.right)
//             .attr('height', w+margin.top+margin.bottom)
//             .append('svg:g')
//             .attr('transform', 'translate('+margin.left+','+margin.top+')');

//         // Add Chart Elements to Chart:
//         chart.append('svg:g')
//             .attr('class', 'x axis')
//             .attr('transform', 'translate(0,' + h + ')')
//             .call(xAxis);

//         chart.append('svg:g')
//             .attr('class', 'y axis')
//             .call(yAxis);

//         chart.append('svg:clipPath')
//             .attr('id', 'clip')
//             .append('svg:rect')
//             .attr('width', w)
//             .attr('height', h);

//         chart.append('svg:path')
//             .attr('class', 'area')
//             .attr('clip-path', 'url(#clip)')
//             .attr('d', area(content));

//         chart.append('svg:path')
//             .attr('class', 'line')
//             .attr('clip-path', 'url(#clip)')
//             .attr('d', line(content));
//         this.set('chart',chart);
// 	}
// });
