App.Router.map(function () {
	this.resource('grid');
});





$(function() {

	var hideShowFooter = function() {
		var lastChild = $("#main").children().last();
		if (!lastChild) return;
		var footer = $("#footer");
		if (!footer) return;

		var childOffset = lastChild.offset();
		if (!childOffset) return;

		var footerOffset = footer.offset();
		if (!footerOffset) return;

		if (lastChild.outerHeight() + childOffset.top + 20 >= footerOffset.top){
			footer.css('visibility', 'hidden');
		} else {
			footer.css('visibility', 'visible');
		}
	};

	hideShowFooter();
	window.onresize = function(event) {
		hideShowFooter();
	}
});
