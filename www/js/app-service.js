(function() {
	var app = angular.module('appService', ['ngRoute']);

	app.config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider.
	      when('/moods', {
	        templateUrl: 'moods.html',
	        controller: 'MoodController',
	        controllerAs: 'moodCtrl'
	      }).
	      when('/styles', {
	      	templateUrl: 'styles.html',
	      	controller: 'StyleController',
	      	controllerAs: 'styleCtrl'
	      }).
	      otherwise({
	        redirectTo: '/moods'
	      });
	  }]);

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

	function getMoodByName(moodName) {
		if(moodName == undefined) {
			return undefined;
		}

		for(i = 0; i < moods.length; i++) {
			if(moodName.toLowerCase() == moods[i].name.toLowerCase()) {
				return moods[i];
			}
		}
	};

	app.controller('MoodController', function() {
		this.moods = moods;
	});

	app.controller('StyleController', function($location) {
		this.styles = styles;

		var search = $location.search();
		var moodParam = search.mood;
		this.selectedMood = getMoodByName(moodParam);
	});

})();