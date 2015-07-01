(function() {

	var timer;
	$(window).on('mousemove', function () {
		$('body').css('cursor', 'auto');
		$('main').removeClass('hidden-menu');
		$('#app-nav-label').removeClass('hidden-menu');

		if(timer) clearTimeout(timer);

		timer = setTimeout(function () {
			$('body').css('cursor', 'none');
			$('main').addClass('hidden-menu');
			$('#app-nav-label').addClass('hidden-menu');
		}, 2000);
	});

})();
