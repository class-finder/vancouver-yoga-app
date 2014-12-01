(function() {
	var app = angular.module('styleService', []);

	var styles = [
		{
			"name": "Hatha",
			"description": "Hatha is good."
		},
		{
			"name": "Yin",
			"description": "Yin is centering."
		}
	];

	app.controller('StyleController', function() {
		this.styles = styles;
	});
})();