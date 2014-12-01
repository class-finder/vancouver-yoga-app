(function() {
	var app = angular.module('moodService', []);

	var moods = [
		{
			"name": "Safe",
			"chakra": "crown"
		},
		{
			"name": "Happy",
			"chakra": "temple"
		},
		{
			"name": "Relaxed",
			"chakra": "throat"
		},
		{
			"name": "Focused",
			"chakra": "heart"
		},
		{
			"name": "Fit",
			"chakra": "solar-plexus"
		},
		{
			"name": "Strong",
			"chakra": "sacral"
		},
		{
			"name": "Enlightened",
			"chakra": "root"
		}
	];

	app.controller('MoodController', function() {
		this.moods = moods;
	});

})();