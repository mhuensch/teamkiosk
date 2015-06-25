App.AnimatedTitleComponent = Ember.Component.extend({
	onValueChange: function() {
		var from = this.get('displayValue');
		var to = this.get('value');

		this.set('displayValue', this.get('value'));

		if (!this.$()) return;

		var box = this.$();
		var value = this.get('displayValue');


		var from = 1;
		var to = 0;

		box.velocity(
			{
				tween: [to, from]
			}
			,{
				progress: function(elements, complete, remaining, start, tweenValue) {
					box.css('opacity', tweenValue);
				}.bind(this),
				complete: function() {
					this.isAnimationRunning = false;
					box.html(value);
					box.velocity("transition.slideLeftIn", { drag: true, delay: 0});
				}.bind(this),
				begin: function() {
					this.isAnimationRunning = true;
				}.bind(this),
				duration: 100,
				easing: 'ease-out'
			}
		);

	}.observes('value').on('init'),

	onDidInsertElement: function() {
		var box = this.$();
		box.html(this.get('displayValue'));
	}.on('didInsertElement'),

	onWillDestroyElement: function() {
		this.$(".box").velocity('stop');
	}.on('willDestroyElement')

});
