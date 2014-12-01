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
	      when('/studios', {
	      	templateUrl: 'studios.html',
	      	controller: 'StudioController',
	      	controllerAs: 'studioCtrl'
	      }).
	      otherwise({
	        redirectTo: '/moods'
	      });
	  }]);

	var moods = [];
	var styles = [];
	var studios = [];

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

	app.controller('StudioController', function() {
		this.studios = studios;
	});

	moods = [
		{
			"name": "Calm",
			"chakra": "crown",
			"styleIntro": "These styles promote calmness."
		},
		{
			"name": "Happy",
			"chakra": "temple",
			"styleIntro": "These styles promote happiness."
		},
		{
			"name": "Relaxed",
			"chakra": "throat",
			"styleIntro": "These styles promote relaxation."
		},
		{
			"name": "Focused",
			"chakra": "heart",
			"styleIntro": "These styles promote focus."
		},
		{
			"name": "Fit",
			"chakra": "solar-plexus",
			"styleIntro": "These styles offer a great workout."
		},
		{
			"name": "Strong",
			"chakra": "sacral",
			"styleIntro": "These styles promote strength and confidence."
		},
		{
			"name": "Enlightened",
			"chakra": "root",
			"styleIntro": "These styles promote introspection."
		}
	];

	styles = [
		{
			"name": "Hatha",
			"description": "Hatha is good."
		},
		{
			"name": "Yin",
			"description": "Yin is centering."
		}
	];

	studios = [
		{
			"name": "Just Yoga",
			"address": "53 E Broadway",
			"website": "http://justyoga.ca",
			"photo": "img/studios/just_yoga_small.jpg"
		},
		{
			"name": "Bikram Yoga Vancouver",
			"address": "555 W 12th Ave",
			"website": "http://www.bikramyogavancouver.com",
			"photo": null
		}
	];
})();