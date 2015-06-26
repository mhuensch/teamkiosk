// TODO: see if this can be removed with the addition of pyre
var path = require('path')
var fs = require('fs');

var requireDir = require('require-dir');
var apis = requireDir(fs.realpathSync('api'));
var services = [];
for(var name in apis) {
	var api = apis[name];
	services[api.route] = api;
}

Api.prototype.query = function (args) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			var res = {
				json: function(data) {
					var result = [];
					data.map(function(item){
						result.push(item);
					});
					resolve(result);
				}
			};

			services[self.url].get({}, res);
		});
};

Api.prototype.read = function (args) {
		var self = this;
		console.log(self.url);
};

Api.prototype.save = function (args) {
		var self = this;
		console.log(self.url);
};

Api.prototype.delete = function (args) {
		var self = this;
		console.log(self.url);
};
