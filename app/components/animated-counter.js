App.AnimatedCounterComponent = Ember.Component.extend({

	tagName: 'span'


	,onValueChange: function() {
		var from = this.get('displayValue');
		var to = this.get('value');
		this.set('displayValue', to);

		if (this.isAnimationRunning) {
			from = parseInt(element.html(), 10);
			element.velocity('stop');
		}

		var element = this.$();
		if (!element) return;

		var options = {

			delay: 50

			,duration: 800

			,easing: 'ease-out'

			,begin: function() {
				this.isAnimationRunning = true;
			}.bind(this)

			,progress: function(elements, complete, remaining, start, tweenValue) {

				element.html(parseInt(tweenValue, 10));
				// console.log(tweenValue);
				// console.log(remaining, start);

			}.bind(this)

			,complete: function() {
				this.isAnimationRunning = false;
			}.bind(this)

		};

		element.velocity({ tween: [to, from] }, options);
	}.observes('value').on('init')


	,onDidInsertElement: function() {
		this.$().html(this.get('displayValue'));
	}.on('didInsertElement')


	,onWillDestroyElement: function() {
		this.$().velocity('stop');
	}.on('willDestroyElement')

});
