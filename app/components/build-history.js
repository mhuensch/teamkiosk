App.BuildHistoryComponent = Ember.Component.extend({

	onValueChange: function() {

		if (!this.get('value')) return;

		var max = this.get('value').map(function(item){
			return item.duration;
		}).reduce(function(max, item){
			return Math.max(Math.abs(max), Math.abs(item));
		});


		var data = {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			series: [[]]
		};

		this.get('value').map(function(value) {
			var result = value.duration * 100 / max;
			if (value.status !== 'success') result = result * -1;
			return data.series[0].push(Math.round(result));
		})

		var chart = this.get('chart');
		if (!chart) return;


		chart.update(data);

	}.observes('value').on('init'),

	onDidInsertElement: function() {

		var self = this;
		var data = {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			series: [[]]
		};


		if (!this.get('value')) return;
		var max = this.get('value').map(function(item){
			return item.duration;
		}).reduce(function(max, item){
			return Math.max(Math.abs(max), Math.abs(item));
		});

		this.get('value').map(function(value) {
			var result = value.duration * 100 / max;
			if (value.status !== 'success') result = result * -1;
			return data.series[0].push(Math.round(result));
		})

		var options = {
			low: -100,
			high: 100,
			axisY: {
				labelInterpolationFnc: function(value, index) {
					return value ? null : ' ';
				}
			},
			axisX: {
				labelInterpolationFnc: function(value, index) {
					return null;
				}
			}
		};

		var previous = [];
		var chart = new Chartist.Bar('.ct-chart', data, options)
			.on('draw', function(data) {

				var opacity = .5;
				if (data.index === 0) opacity = 1;
				if(data.type !== 'bar') return;

				data.element.attr({ style: 'stroke-width: 10%; stroke:rgba(128, 0, 0, '+opacity+');' });
				if (data.value > 0) {
					data.element.attr({
						style: 'stroke-width: 10%; stroke:rgba(0, 128, 0, '+opacity+');'
					});
				}

				var y1 = previous[data.index];
				if (!y1) y1 = data.y1;

				data.element.animate({
					y2:{
						dur: 500,
						from: y1,
						to: data.y2
					}
				});

				previous[data.index] = data.y2;

			});

		this.set('chart', chart)
	}.on('didInsertElement')

});


