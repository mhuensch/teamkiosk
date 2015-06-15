(function() {

	var timer;
	$(window).on('mousemove', function () {
		$('body').css('cursor', 'auto');

		if(timer) clearTimeout(timer);

		timer = setTimeout(function () {
			$('body').css('cursor', 'none');
		}, 2000);
	});

})();
