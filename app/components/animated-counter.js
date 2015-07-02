// ---------------------------------------------------------------------------------------------------------------------
// ANIMATED COUNTER COMPONENT
// This component creates animated text (with numbers) that counts from the current to the resulting number.
// ---------------------------------------------------------------------------------------------------------------------

App.AnimatedCounterComponent = Ember.Component.extend({

	tagName: 'span'


	,onValueChange: function() {
		var from = this.get('displayValue');
		var to = this.get('value');
		this.set('displayValue', to);

		var element = this.$();
		if (!element) return;

		if (this.isAnimationRunning) {
			from = parseInt(element.html(), 10);
			element.velocity('stop');
		}

		var options = {

			delay: 50

			,duration: 400

			,easing: 'ease-out'

			,begin: function() {
				this.isAnimationRunning = true;
			}.bind(this)

			,progress: function(elements, complete, remaining, start, tweenValue) {
				element.html(parseInt(tweenValue, 10));
			}.bind(this)

			,complete: function() {
				this.isAnimationRunning = false;
			}.bind(this)

		};

		element.velocity({ tween: [to, from] }, options);
	}.observes('value').on('init')


	,onDidInsertElement: function() {
		this.$().html(parseInt(this.get('displayValue')));
	}.on('didInsertElement')


	,onWillDestroyElement: function() {
		this.$().velocity('stop');
	}.on('willDestroyElement')

});
