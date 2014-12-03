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
			"phone": "(604) 709-9642",
			"photo": "img/studios/just_yoga_small.jpg"
		},
		{
			"name": "Bikram Yoga Vancouver",
			"address": "City Square Shopping Centre, #22 - 555 W 12th Ave",
			"phone": "(604) 568-0688",
			"website": "http://www.bikramyogavancouver.com",
			"photo": null
		},
		{
			"name": "Yoga in Daily Life",
			"address": "223 W Broadway #200",
			"phone": "(604) 646-0134",
			"website": "http://vanyoga.com",
			"photo": null
		},
		{
			"name": "Ron Zalko Total Body Fitness and Yoga",
			"address": "1807 W 1st Ave",
			"phone": "(604) 737-4355",
			"website": "http://ronzalko.com",
			"photo": null
		},
		{
			"name": "Semperviva Yoga - Sea Center",
			"address": "200-1333 Johnston St",
			"phone": "(604) 739-2087",
			"website": "http://semperviva.com",
			"photo": null
		},
		{
			"name": "The Pilates Studio at Treloar",
			"address": "686 W Broadway",
			"phone": "(604) 875-6207",
			"website": "http://treloarphysio.com",
			"photo": null
		},
		{
			"name": "YYoga South Granville",
			"address": "1627 W Broadway",
			"phone": "(604) 736-6009",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "YYoga Kitsilano",
			"address": "1915 W 4th Ave",
			"phone": "(604) 336-4599",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Vital Health Medical & Wellness Clinic",
			"address": "1855 W 4th Ave",
			"phone": "(604) 558-4825",
			"website": "http://vitalwellnessgroup.com",
			"photo": null
		},
		{
			"name": "Semperviva Yoga - City Center",
			"address": "1985 W Broadway #100",
			"phone": "(604) 739-2009",
			"website": "http://semperviva.com",
			"photo": null
		},
		{
			"name": "YYoga West Sixth",
			"address": "1569 W 6th Ave",
			"phone": "(604) 428-2523",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Prana Yoga College",
			"address": "200 E 2nd Ave",
			"phone": "(604) 682-2121",
			"website": "http://pranayogacollege.com",
			"photo": null
		},
		{
			"name": "Good Karma Yoga",
			"address": "686 W Broadway",
			"phone": "(778) 829-0440",
			"website": null,
			"photo": null
		},
		{
			"name": "The Curious Yogis",
			"address": "Yukon Street and 12th Avenue",
			"phone": "(778) 230-3308",
			"website": "http://thecuriousyogis.com",
			"photo": null
		},
		{
			"name": "Bikram's Yoga",
			"address": "2480 Spruce St",
			"phone": "(604) 568-2445",
			"website": "http://bikramyogavancouver.com",
			"photo": null
		},
		{
			"name": "YYoga",
			"address": "1650 W 2nd Ave",
			"phone": "(604) 736-6002",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Elevate Qi Health",
			"address": "1764 W 7th Ave",
			"phone": "(778) 847-9642",
			"website": "http://elevateqihealth.com",
			"photo": null
		},
		{
			"name": "Ashtanga Yoga Vancouver",
			"address": "2515 Burrard St #201",
			"phone": "(604) 307-2644",
			"website": "http://ashtangayogavancouver.com",
			"photo": null
		},
		{
			"name": "Glo Pilates and Yoga Inc.",
			"address": "1033 Marinaside Crescent",
			"phone": "(604) 719-2367",
			"website": null,
			"photo": null
		},
		{
			"name": "Ohm Studios",
			"address": "199 W 4th Ave",
			"phone": null,
			"website": null,
			"photo": null
		},
		{
			"name": "Lotus Room Yoga",
			"address": "196 W 18th Ave",
			"phone": "(604) 876-8550",
			"website": null,
			"photo": null
		},
		{
			"name": "Compasha Massage Yoga Holistics",
			"address": "1687 W Broadway",
			"phone": "(604) 379-2047",
			"website": "http://compasha.com",
			"photo": null
		},
		{
			"name": "Urban Fitness Club",
			"address": "928 Davie St",
			"phone": "(604) 696-5549",
			"website": "http://urbanfitnessclub.com",
			"photo": null
		},
		{
			"name": "Radha Yoga Vancouver",
			"address": "1529 W 6th Ave",
			"phone": "(778) 889-1258",
			"website": "http://radhavancouver.org",
			"photo": null
		},
		{
			"name": "Dr. Thara Vayali, ND",
			"address": "1529 W 6th Ave",
			"phone": "(604) 500-1888",
			"website": "http://tharavayali.ca",
			"photo": null
		},
		{
			"name": "Semperviva Yoga",
			"address": "2201 W 4th Ave",
			"phone": "(604) 739-2088",
			"website": "http://semperviva.com",
			"photo": null
		},
		{
			"name": "Padma Yoga & Meditation",
			"address": "1854 W 4th Ave",
			"phone": "(604) 738-9981",
			"website": "http://padmayoga.ca",
			"photo": null
		},
		{
			"name": "Sivananda Yoga",
			"address": "708 W 16th Ave",
			"phone": "(604) 880-2109",
			"website": "http://sivananda.org",
			"photo": null
		},
		{
			"name": "YYoga Yaletown",
			"address": "1050 Homer St",
			"phone": "(604) 684-3334",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Vancouver Corporate Yoga",
			"address": "Royal Centre, 1055 W Georgia St",
			"phone": "(604) 267-9642",
			"website": "http://vancouvercorporateyoga.com",
			"photo": null
		},
		{
			"name": "WestCoast Hot Yoga",
			"address": "1128 Mainland St",
			"phone": "(604) 221-9642",
			"website": "http://westcoasthotyoga.com",
			"photo": null
		},
		{
			"name": "Form Body Lab",
			"address": "1008 Homer St",
			"phone": "(604) 687-6870",
			"website": "http://formbodylab.com",
			"photo": null
		},
		{
			"name": "Three Jewels Vancouver",
			"address": "9 E Broadway",
			"phone": "(604) 685-9215",
			"website": "http://threejewelsvancouver.com",
			"photo": null
		},
		{
			"name": "YYoga Downtown Flow",
			"address": "888 Burrard St",
			"phone": "(604) 682-3569",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Yoga On 7th",
			"address": "156 7 Ave E",
			"phone": "(604) 879-9642",
			"website": "http://yogaon7th.com",
			"photo": null
		},
		{
			"name": "Yoga On The Flow",
			"address": null,
			"phone": "(604) 345-5008",
			"website": "http://yogaontheflow.com",
			"photo": null
		},
		{
			"name": "Open Door Yoga Inc",
			"address": "E 15th Ave",
			"phone": "(778) 371-8179",
			"website": "http://opendooryoga.bc.ca",
			"photo": null
		},
		{
			"name": "One Yoga for the People",
			"address": "150 W Hastings St #201",
			"phone": "604) 710-7267",
			"website": null,
			"photo": null
		},
		{
			"name": "Moksha Yoga East Vancouver",
			"address": "560 E 15th Ave",
			"phone": "(604) 569-3300",
			"website": "http://east-vancouver.mokshayoga.ca",
			"photo": null
		},
		{
			"name": "Bikram Yoga Commercial Drive",
			"address": "1109 Commercial Dr",
			"phone": "(604) 251-9642",
			"website": "http://bikramyogacommercialdrive.com",
			"photo": null
		},
		{
			"name": "Unity Yoga Teahouse",
			"address": "1672 10th Ave E 2nd floor ",
			"phone": "(604) 708-8369",
			"website": "http://unityyoga.ca",
			"photo": null
		},
		{
			"name": "Main Street Physiotherapy Clinic",
			"address": "4817 Main St #1",
			"phone": "(604) 568-2744",
			"website": "http://mainstreetphysio.ca",
			"photo": null
		},
		{
			"name": "Open Door Yoga",
			"address": "1651 Commercial Dr #245",
			"phone": "(778) 371-8179",
			"website": "http://opendooryoga.bc.ca",
			"photo": null
		},
		{
			"name": "Eastside Fitness",
			"address": "5854 Fraser St",
			"phone": "(604) 568-1224",
			"website": "http://eastsidefitness.ca",
			"photo": null
		},
		{
			"name": "YYoga Northshore Elements",
			"address": "1233 Lynn Valley Rd",
			"city": "North Vancouver",
			"phone": "(604) 987-0308",
			"website": "http://yyoga.ca",
			"photo": null
		},
		{
			"name": "Sacred Space Studio",
			"address": "3574 W 4th Ave",
			"phone": "(604) 307-5739",
			"website": "http://sacredspacestudio.ca",
			"photo": null
		},
		{
			"name": "Spire Wellness",
			"address": "2885 W 33rd Ave",
			"phone": "(604) 569-0963",
			"website": "http://s-pire.ca",
			"photo": null
		},
		{
			"name": "Gold's Gym University Market Place",
			"address": "2155 Allison Rd",
			"phone": "(604) 224-4699",
			"website": "http://goldsgymbc.ca",
			"photo": null
		},
		{
			"name": "Downtown Physiotherapy & Health",
			"address": "1138 Richards St",
			"phone": "(604) 336-6709",
			"website": "http://downtownphysio.org",
			"photo": null
		},
		{
			"name": "KLP Yoga Studio",
			"address": "1055 Richards St",
			"phone": "(604) 790-9337",
			"website": "http://klpyoga.com",
			"photo": null
		},
		{
			"name": "Yogacara Studios - Mount Pleasant Yoga",
			"address": "3381 Fraser St",
			"phone": "(604) 568-3334",
			"website": "http://vancouveryogacara.com",
			"photo": null
		},
		{
			"name": "Yoga For Anyone",
			"address": null,
			"phone": "(604) 764-6571",
			"website": "http://yogaforanyone.com",
			"photo": null
		},
		{
			"name": "Yoga Moves Inc",
			"address": "1000 Roosevelt Crescent #120",
			"city": "North Vancouver",
			"phone": "(604) 986-3811",
			"website": "http://yogamoves.ca",
			"photo": null
		},
		{
			"name": "Body Harmony Yoga Studio",
			"address": "Suite 301 - 972 Marine Dr",
			"city": "North Vancouver",
			"phone": "(604) 929-9642",
			"website": "http://bodyharmony.ca",
			"photo": null
		},
		{
			"name": "Open Door Yoga Inc",
			"address": "6158 East Blvd",
			"phone": "(604) 266-6040",
			"website": "http://opendooryoga.bc.ca",
			"photo": null
		},
		{
			"name": "Family Passages",
			"address": "5737 Collingwood St",
			"phone": "(604) 266-6470",
			"website": "http://familypassages.ca",
			"photo": null
		},
		{
			"name": "North Shore Orthopaedic & Sports Physiotherapy Clinic",
			"address": "125 E 13 St",
			"city": "North Vancouver",
			"phone": "(604) 987-5291",
			"website": "http://nsosc.com",
			"photo": null
		},
		{
			"name": "Vancouver Yoga: Bloom Yoga Studio",
			"address": "8337 Granville St #220",
			"phone": "(778) 370-4928",
			"website": "http://bloomyogastudio.ca",
			"photo": null
		},
		{
			"name": "BAB Integral Ayurveda & Yoga",
			"address": "250 2nd St E",
			"city": "North Vancouver",
			"phone": "(778) 866-5660",
			"website": "http://bablends.ca",
			"photo": null
		},
		{
			"name": "Urban Yoga",
			"address": "1705 - 5728 Berton Avenue",
			"phone": null,
			"website": "http://urbanyoga.ca",
			"photo": null
		},
		{
			"name": "The Hot Box Yoga",
			"address": "3313 Shrum Lane",
			"phone": "844-484-9642",
			"website": "http://thehotboxyoga.com",
			"photo": null
		},
		{
			"name": "Ocean and Crow Yoga/East Side Yoga",
			"address": "1707 Grant St",
			"phone": "(604) 251-2470",
			"website": "http://oceanandcrow.ca",
			"photo": null
		},
		{
			"name": "Open Door Yoga Inc",
			"address": "1111 Commercial Dr",
			"phone": "(604) 677-4972",
			"website": "http://opendooryoga.bc.ca",
			"photo": null
		},
		{
			"name": "Champlain Heights Community Centre",
			"address": "3350 Maquinna Dr",
			"phone": "(604) 718-6575",
			"website": "http://vancouver.ca",
			"photo": null
		},
		{
			"name": "YogaOne BC",
			"address": "3103 E 45th Ave",
			"phone": "(604) 375-2871",
			"website": null,
			"photo": null
		},
		{
			"name": "Maa Yoga Studio",
			"address": "489 Dollarton Hwy N",
			"city": "North Vancouver",
			"phone": "(604) 983-6229",
			"website": "http://maayogastudio.com",
			"photo": null
		},
		{
			"name": "Yogapod",
			"address": "260 W Esplanade",
			"city": "North Vancouver",
			"phone": "(604) 924-9642",
			"website": "http://yogapod.com",
			"photo": null
		},
		{
			"name": "Siddha Yoga Meditation Ctr",
			"address": "2780 Broadway E",
			"phone": "(604) 255-7960",
			"website": null,
			"photo": null
		},
		{
			"name": "Drum Mama Studios",
			"address": "W 43rd Ave",
			"phone": "(604) 873-9495",
			"website": "http://drummama.com",
			"photo": null
		},
		{
			"name": "Alliance Wellness",
			"address": "1177 W Broadway",
			"phone": "(604) 737-1177",
			"website": "http://alliancewellness.ca",
			"photo": null
		},
		{
			"name": "Sitka Physio & Wellness",
			"address": "900 W Georgia St",
			"phone": "(604) 558-2222",
			"website": "http://www.vancouverphysiotherapy.com",
			"photo": null
		},
		{
			"name": "GoodLife Fitness",
			"address": "1401 W 8th Ave",
			"phone": "(604) 733-9991",
			"website": "http://goodlifefitness.ca",
			"photo": null
		},
		{
			"name": "Kalev Fitness Yaletown",
			"address": "840 Cambie Street",
			"phone": "(604) 568-6006",
			"website": "http://kalevfitness.com",
			"photo": null
		},
		{
			"name": "Chopra Yoga",
			"address": "451 Granville Street",
			"phone": "(604) 424-9422",
			"website": "http://choprayoga.com",
			"photo": null
		},
		{
			"name": "Robson St Yoga",
			"address": "1610 Robson St",
			"phone": "(778) 888-9642",
			"website": "http://robsonstyoga.ca",
			"photo": null
		},
		{
			"name": "Do Less Project",
			"address": "485 W 14th Avenue",
			"phone": "(604) 366-3483",
			"website": "http://doless.ca",
			"photo": null
		},
		{
			"name": "The Yoga Space",
			"address": "677 E 27th",
			"phone": "(604) 876-9600",
			"website": "http://theyogaspace.ca",
			"photo": null
		},
		{
			"name": "Green Room Yoga",
			"address": "2645 Hastings St E",
			"phone": "(604) 318-4066",
			"website": "http://greenroomyoga.ca",
			"photo": null
		},
		{
			"name": "The Path Yoga Studio",
			"address": "240-2083 Alma Street",
			"phone": "(604) 562-1944",
			"website": "http://thepathyoga.com",
			"photo": null
		},
		{
			"name": "Yoga West of Vancouver",
			"address": "2662 4th Ave W",
			"phone": "(604) 732-9642",
			"website": null,
			"photo": null
		},
		{
			"name": "Exhale Studio",
			"address": "1083 Cambie St",
			"phone": "(604) 689-2446",
			"website": "http://exhalestudio.com",
			"photo": null
		},
		{
			"name": "Kondi Callenetics",
			"address": "Unit 100 - 1462 W 8th Avenue",
			"phone": "(604) 724-3782",
			"website": "http://studio.kondicallenetics.com",
			"photo": null
		},
		{
			"name": "Sanga Yoga Studio",
			"address": "3458 Dunbar Street",
			"phone": "(604) 733-7264",
			"website": "http://sangayoga.ca",
			"photo": null
		},
		{
			"name": "Yoga Buttons",
			"address": "2525 W Broadway",
			"phone": "(604) 739-9642",
			"website": "http://yogabuttons.com",
			"photo": null
		},
		{
			"name": "Inner Truth Yoga",
			"address": "1160 Davie Street, 3rd Fl Sandman Suites Hotel",
			"phone": "(604) 726-6967",
			"website": "http://innertruthyoga.org",
			"photo": null
		},
		{
			"name": "Bikram Yoga Vancouver",
			"address": "1650 Alberni Street",
			"phone": "(604) 662-7722",
			"website": "http://bikramyogavancouver.com",
			"photo": null
		},
		{
			"name": "Robert Lee YMCA",
			"address": "955 Burrard St",
			"phone": "(604) 689-9622",
			"website": "http://robertleeymca.ca",
			"photo": null
		},
		{
			"name": "Studeo 55",
			"address": "847 Hornby Street",
			"phone": "(604) 684-0544",
			"website": "http://studeo55.ca",
			"photo": null
		},
		{
			"name": "Spartacus Gym",
			"address": "1522 Commercial Drive",
			"phone": "(604) 254-6267",
			"website": "http://spartacusgym.ca",
			"photo": null
		},
		{
			"name": "Ganja Yoga Vancouver",
			"address": "303 W Hastings Street, 2nd Floor",
			"phone": "(778) 835-4137",
			"website": null,
			"photo": null
		},
		{
			"name": "Karma Teachers",
			"address": "45 West Hastings",
			"phone": "(604) 700-6489",
			"website": "http://karmateachers.com",
			"photo": null
		},
		{
			"name": "Kerrisdale Yoga",
			"address": "6170 East Blvd",
			"phone": "(604) 263-0008",
			"website": "http://kerrisdaleyoga.com",
			"photo": null
		},
		{
			"name": "Yoga Sukha",
			"address": "2111 16th Avenue W",
			"phone": "(604) 739-9642",
			"website": "http://yogasukha.ca",
			"photo": null
		},
		{
			"name": "Full Circle Studio",
			"address": "101-1183 Odlum Drive",
			"phone": "(604) 566-0053",
			"website": "http://fullcirclestudio.com",
			"photo": null
		},
		{
			"name": "Urban Fitness Club South Granville",
			"address": "2213 Granville Street",
			"phone": "(604) 428-5555",
			"website": "http://urbanfitnessclub.com",
			"photo": null
		},
		{
			"name": "Mount Pleasant Infrared Yoga",
			"address": "Main Street and 16th Avenue",
			"phone": "(604) 345-5443",
			"website": "http://mountpleasantinfraredyoga.com",
			"photo": null
		},
		{
			"name": "Vancouver School of Yoga",
			"address": "300 - 342 Water Street",
			"phone": "(604) 688-5060",
			"website": "http://vancouverschoolofyoga.com",
			"photo": null
		},
		{
			"name": "Universal Laughter",
			"address": "1420 E 7th Avenue",
			"phone": "(604) 318-6658",
			"website": "http://universal-laughter.com",
			"photo": null
		},
		{
			"name": "Blond Monkey Yoga",
			"address": "4439 W 10th Avenue",
			"phone": "(778) 241-9642",
			"website": null,
			"photo": null
		},
		{
			"name": "Reunited Yoga",
			"address": "990 Lagoon Dr",
			"phone": "(604) 363-3791",
			"website": "http://reunitedyoga.ca",
			"photo": null
		},
		{
			"name": "Live Rich Fitness Co.",
			"address": null,
			"phone": "(778) 772-6305",
			"website": "http://liverichfitness.com",
			"photo": null
		},
		{
			"name": "Compasha",
			"address": "Suite 60 - 1687 W Broadway",
			"phone": "(604) 379-2047",
			"website": "http://compasha.com",
			"photo": null
		},
		{
			"name": "West End Community Centre",
			"address": "870 Denman St",
			"phone": "(604) 257-8333",
			"website": "http://westendcc.ca",
			"photo": null
		},
		{
			"name": "Original Yin Qi Gong Gym",
			"address": "434 W 8th Ave",
			"phone": "(604) 879-0881",
			"website": null,
			"photo": null
		},
		{
			"name": "Good Karma Yoga",
			"address": "Suite 102 - 686 W Broadway St",
			"phone": "(778) 829-0440",
			"website": null,
			"photo": null
		},
		{
			"name": "The Mat Yoga",
			"address": "7667 Nanaimo Street",
			"phone": "(778) 886-9599",
			"website": "http://thematyoga.ca",
			"photo": null
		},
		{
			"name": "Maximum Core Cardio Studio Ltd.",
			"address": "3433 E Hastings Street",
			"phone": "(604) 568-7853",
			"website": "http://core-studio.ca",
			"photo": null
		},
		{
			"name": "Semperviva Yoga Sun Studio",
			"address": "2608 W Broadway",
			"phone": "(604) 739-2009",
			"website": "http://semperviva.com",
			"photo": null
		},
		{
			"name": "Kits Yoga",
			"address": "1807 West 1st Ave",
			"phone": "(604) 737-4355",
			"website": "http://kitsyoga.ca",
			"photo": null
		},
		{
			"name": "Tessa Yoga",
			"address": "251 East 11th Avenue",
			"phone": "Phone number (778) 927-0565",
			"website": "http://tessayoga.ca",
			"photo": null
		},
		{
			"name": "Dahn Energy Training",
			"address": "1765 8th Avenue W",
			"phone": "(604) 714-0074",
			"website": null,
			"photo": null
		},
		{
			"name": "Grace Yoga & Meditation",
			"address": "3574 4th Avenue W",
			"phone": "(604) 889-3342",
			"website": "http://livefromgrace.com",
			"photo": null
		},
		{
			"name": "Creekside Community Centre",
			"address": "1 Athletes Way",
			"phone": "(604) 257-3050",
			"website": "http://vancouver.ca/parks-recreation-culture/creekside-community-recreation-centre.aspx",
			"photo": null
		},
		{
			"name": "Line 5 Pilates Studios",
			"address": "1 West Pender Street",
			"phone": "(604) 558-1030",
			"website": "http://line5studios.com",
			"photo": null
		},
		{
			"name": "Radiant Healing",
			"address": "Suite 210 - 2475 Bayswater Street",
			"phone": "(604) 328-8992",
			"website": null,
			"photo": null
		},
		{
			"name": "Ommamma Yoga",
			"address": "2631 E 21st Avenue",
			"phone": "(604) 943-3221",
			"website": "http://ommammayoga.ca",
			"photo": null
		},
		{
			"name": "YoGuy Men’s Yoga",
			"address": "575 W 8th Avenue",
			"phone": "(604) 362-3434",
			"website": "yoguy.ca",
			"photo": null
		}
	];
})();