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

	function findListElementByName(list, elementName) {
		if(list === undefined || elementName === undefined) {
			return undefined;
		}

		for(i = 0; i < list.length; i++) {
			if(elementName.toLowerCase() == list[i].name.toLowerCase()) {
				return list[i];
			}
		}

		return undefined;
	};

	app.controller('MoodController', function() {
		this.moods = moods;
	});

	app.controller('StyleController', function($location) {
		this.styles = styles;

		var search = $location.search();
		var moodParam = search.mood;
		this.selectedMood = findListElementByName(moods, moodParam);

		this.getStylesByMood = function(mood) {
			var result = [];
			for(var i = 0; i < this.styles.length; i++) {
				if(styles[i].moods.indexOf(mood.name) >= 0) {
					result.push(styles[i]);
				}
			}

			return result;
		}
	});

	app.controller('StudioController', function($location) {
		this.studios = studios;

		var search = $location.search();
		var styleParam = search.style;
		this.selectedStyle = findListElementByName(styles, styleParam);

		this.launchWebsite = function(websiteUrl) {
			window.open(websiteUrl, '_system');
		};
	});

	moods = [
		{
			"name": "Relaxed",
			"chakra": "crown",
			"styleIntro": "These styles promote relaxation."
		},
		{
			"name": "Happy",
			"chakra": "temple",
			"styleIntro": "These styles promote happiness."
		},
		{
			"name": "Detoxed",
			"chakra": "throat",
			"styleIntro": "These styles promote detoxification."
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
			"styleIntro": "These styles promote introspection and meditation."
		}
	];

	styles = [
		{
			"name": "Ashtanga",
			"description": "Ashtanga is a fast-paced, intense style of yoga. A set series of \
			poses is performed, always in the same order. This practice is very \
			physically demanding because of the constant movement from one pose to \
			the next and the emphasis on daily practice.",
			"moods": ["Fit", "Strong"]
		},
		{
			"name": "Bikram",
			"description": "In a Bikram class, you will sweat like you've never sweated before \
			as you work your way through a series of 26 poses. A Bikram class always follows \
			the same sequence.",
			"moods": ["Fit", "Detoxed"]
		},
		{
			"name": "Core",
			"description": "A dynamic and challenging sequence of postures that synchronizes breath \
			with movement in order to build strength, balance, and flexibility. Includes targeted \
			core conditioning designed to increase functional movement and structural alignment.",
			"moods": ["Fit", "Strong"]
		},
		{
			"name": "50+",
			"description": "A gentle option for the older adult (or anyone) who is looking to \
			increase joint flexibility as well as decrease stress and stiffness in the body.",
			"moods": ["Relaxed", "Strong"]
		},
		{
			"name": "Hatha",
			"description": "Classes described as “hatha” on studio schedules are typically a basic \
			and classical approach to yogic breathing exercises and postures.",
			"moods": ["Relaxed", "Happy", "Focused", "Strong"]
		},
		{
			"name": "Hot Yoga",
			"description": "Hot yoga is practiced in a 95 to 100 degree room, which allows for a \
			loosening of tight muscles and profuse sweating, which is thought to be cleansing.",
			"moods": ["Fit", "Detoxed"]
		},
		{
			"name": "Kundalini",
			"description": "The practice of kundalini yoga features constantly moving, invigorating \
			poses. The fluidity of the practice is intended to release the kundalini (serpent) \
			energy in your body.",
			"moods": ["Happy", "Fit"]
		},
		{
			"name": "Laughter",
			"description": "Laughter yoga (Hasyayoga) is a practice involving prolonged voluntary \
			laughter. Laughter yoga is based on the belief that voluntary laughter provides the same \
			physiological and psychological benefits as spontaneous laughter. Laughter yoga is done \
			in groups, with eye contact and playfulness between participants.",
			"moods": ["Happy", "Relaxed", "Enlightened"]
		},
		{
			"name": "Moksha",
			"description": "Moksha hot yoga classes are based on a series of 40 poses done in a heated \
			room. The studios are expected to adhere to environmentally conscious building and cleaning \
			standards.",
			"moods": ["Fit", "Detoxed"]
		},
		{
			"name": "Pilates",
			"description": "Pilates is a system of exercises using special apparatus, designed to improve \
			physical strength, flexibility, and posture, and enhance mental awareness.",
			"moods": ["Fit", "Strong"]
		},
		{
			"name": "Restorative",
			"description": "Restorative yoga is a delicious way to way to relax and soothe frayed nerves. \
			Restorative classes use bolsters, blankets, and blocks to prop students in passive poses so \
			that the body can experience the benefits of a pose without having to exert any effort. A \
			good restorative class is more rejuvenating than a nap.",
			"moods": ["Relaxed", "Strong"]
		},
		{
			"name": "Qigong",
			"description": "Qigong is a Chinese system of physical exercises and breathing control related to tai chi.",
			"moods": ["Relaxed", "Focused", "Enlightened"]
		},
		{
			"name": "Vinyasa",
			"description": "Vinyasa classes, sometimes called \"Power\" or \"Flow\", are known for \
			their fluid, movement-intensive practices. \
			Vinyasa teachers choreograph their classes to smoothly transition from pose to pose, \
			and often play music to keep things lively. The intensity of the practice is similar to \
			Ashtanga, but no two vinyasa classes are the same.",
			"moods": ["Focused", "Fit", "Strong"]
		},
		{
			"name": "Yin",
			"description": "A quiet, meditative yoga practice, also called taoist yoga. Yin focuses \
			on lengthening connective tissues and is meant to complement yang yoga — your muscle-forming \
			Anusara, ashtanga, Iyengar, or what have you. Yin poses are passive, meaning you’re supposed \
			to relax muscles and let gravity do the work. And they’re long — you’ll practice patience \
			here too.",
			"moods": ["Relaxed", "Focused", "Enlightened"]
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
			"address": "City Square Shopping Centre, 555 W 12th Ave",
			"website": "http://www.bikramyogavancouver.com",
			"photo": null
		},
		{
			"name": "Yoga in Daily Life",
			"address": "223 W Broadway #200",
			"phone": "(604) 646-0134"
			"website": "http://vanyoga.com",
			"photo": null
		}
	];
})();