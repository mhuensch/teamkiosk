// ---------------------------------------------------------------------------------------------------------------------
// SPARK CHART COMPONENT
// This component creates animated spark chart for displaying differences in sets.
// ---------------------------------------------------------------------------------------------------------------------

App.SparkChartComponent = Ember.Component.extend({

	classNames: ['spark-chart']

	,onValueChange: function() {
		this._updateChart();
	}.observes('value').on('init')


	,onDidInsertElement: function() {
		this._addChart();
		this._updateChart();
	}.on('didInsertElement')


	,_addChart: function() {
		var previous = [];
		var size = this.get('size');

		var options = {
			low: -100
			,high: 100
			,axisY: {
				labelInterpolationFnc: function(value, index) {
					return value ? null : ' ';
				}
			}
			,axisX: {
				labelInterpolationFnc: function(value, index) {
					return null;
				}
			}
		};

		var labels = Array.apply(null, {length: 10}).map(Number.call, function(n){ return n + 1;});
		this.set('labels', labels);
		var chart = new Chartist.Bar('.spark-chart', {
			labels: labels
			,series: [labels]
		}, options);

		chart.on('draw', function(data) {
			var opacity = .5;
			if (data.index === 0) opacity = 1;
			if (data.type !== 'bar') return;

			var barPercent = 100/size + '%';
			data.element.attr({ style: 'stroke: rgba(128, 0, 0, '+opacity+');' });
			if (data.value > 0) {
				data.element.attr({
					style: 'stroke: rgba(0, 128, 0, '+opacity+');'
				});
			}

			var y1 = previous[data.index];
			if (!y1) y1 = data.y1;

			data.element.animate({
				y2:{
					dur: 500
					,from: y1
					,to: data.y2
				}
			});

			previous[data.index] = data.y2;
		});

		this.set('chart', chart);
	}


	,_updateChart: function() {
		var value = this.get('value');
		var labels = this.get('labels');
		var chart = this.get('chart');

		if (!value || !labels || !chart) return;

		var max = value.map(function(item){
			return item.duration;
		}).reduce(function(max, item){
			return Math.max(Math.abs(max), Math.abs(item));
		});


		value = value.filter(function(value){return value ? true:false;})
		value = value.map(function(build) {
			var result = build.duration * 100 / max;
			if (build.status !== 'success') result = result * -1;
			return Math.round(result);
		});


		chart.update({
			labels: labels
			,series: [value]
		});
	}

});


