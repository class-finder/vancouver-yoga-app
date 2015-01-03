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
        when('/classes', {
          templateUrl: 'classes.html',
          controller: 'ClassController',
          controllerAs: 'classCtrl'
        }).
        otherwise({
          redirectTo: '/moods'
        });
    }]);

  var moods = [];
  var styles = [];
  var studios = [];

  var weekday = new Array(7);
  weekday[0]=  "sun";
  weekday[1] = "mon";
  weekday[2] = "tue";
  weekday[3] = "wed";
  weekday[4] = "thu";
  weekday[5] = "fri";
  weekday[6] = "sat";

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

  app.controller('ClassController', function($location) {
    this.studios = studios;

    this.findStudioById = function(studioId) {
      var matching = this.studios.filter(function(elem) {
        return elem.studioId === studioId;
      }, this);

      if(matching.length == 0)
        return null;
      else
        return matching[0];
    }.bind(this);

    var search = $location.search();
    var styleParam = search.style;
    this.selectedStyle = findListElementByName(styles, styleParam);

    this.dayFilter = weekday[new Date().getDay()];

    this.refreshClasses = function(classes) {
      this.classes = classes.filter(function(elem) {
        return elem.day === this.dayFilter && elem.style === this.selectedStyle.name;
      }, this).map(function(elem) {
        elem.studio = this.findStudioById(elem.studioId);

        switch(elem.day) {
          case "sun":
            elem.day = "Sunday";
            break;
          case "mon":
            elem.day = "Monday";
            break;
          case "tue":
            elem.day = "Tuesday";
            break;
          case "wed":
            elem.day = "Wednesday";
            break;
          case "thu":
            elem.day = "Thursday";
            break;
          case "fri":
            elem.day = "Friday";
            break;
          case "sat":
            elem.day = "Saturday";
            break;
        }

        return elem;
      }, this);
    }.bind(this, classes);

    this.refreshClasses();

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
      "studioId" : "02630E5D19DC4ACDB190FDA74A3B1ADE",
      "name" : "YoGuy Men's Yoga",
      "address" : {
        "street" : "575 W 8th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 362-3434",
      "website" : "yoguy.ca"
    }, {
      "studioId" : "04BC4EC532F74F9EACEC6651F2F183E6",
      "name" : "Good Karma Yoga",
      "address" : {
        "street" : "686 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 829-0440",
      "website" : null
    }, {
      "studioId" : "05710B47EA9544B183B8B6B9E7730144",
      "name" : "The Mat Yoga",
      "address" : {
        "street" : "7667 Nanaimo Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 886-9599",
      "website" : "http://thematyoga.ca"
    }, {
      "studioId" : "08E0E35839924063BE64E156BACC2443",
      "name" : "Robert Lee YMCA",
      "address" : {
        "street" : "955 Burrard St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 689-9622",
      "website" : "http://robertleeymca.ca"
    }, {
      "studioId" : "0A18E7648C9E40A4AF7F01C83B51EC03",
      "name" : "Reunited Yoga",
      "address" : {
        "street" : "990 Lagoon Dr",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 363-3791",
      "website" : "http://reunitedyoga.ca"
    }, {
      "studioId" : "0B5887654CFD4794A0F23717E6857D68",
      "name" : "Radiant Healing",
      "address" : {
        "street" : "Suite 210 - 2475 Bayswater Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 328-8992",
      "website" : null
    }, {
      "studioId" : "0D52AB14A7E34CB7A7367FD9C601784D",
      "name" : "Robson St Yoga",
      "address" : {
        "street" : "1610 Robson St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 888-9642",
      "website" : "http://robsonstyoga.ca"
    }, {
      "studioId" : "24EBC6EF30BE453489BDD3DFDC7B0539",
      "name" : "Studeo 55",
      "address" : {
        "street" : "847 Hornby Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 684-0544",
      "website" : "http://studeo55.ca"
    }, {
      "studioId" : "2642679CC33B4D668DD258BF80CF6C48",
      "name" : "Bikram Yoga Vancouver",
      "address" : {
        "street" : "1650 Alberni Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 662-7722",
      "website" : "http://bikramyogavancouver.com"
    }, {
      "studioId" : "281BBC6FCC2545DBB51675F72DBCEE45",
      "name" : "Grace Yoga & Meditation",
      "address" : {
        "street" : "3574 4th Avenue W",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 889-3342",
      "website" : "http://livefromgrace.com"
    }, {
      "studioId" : "3363441DCAE04374977CB8ECF1074794",
      "name" : "Ocean and Crow Yoga/East Side Yoga",
      "address" : {
        "street" : "1707 Grant St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 251-2470",
      "website" : "http://oceanandcrow.ca"
    }, {
      "studioId" : "33D95743562D4828A08E8C892CEE368B",
      "name" : "Do Less Project",
      "address" : {
        "street" : "485 W 14th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 366-3483",
      "website" : "http://doless.ca"
    }, {
      "studioId" : "342F12A4DCEB4C8F951D94A9513400E5",
      "name" : "Sacred Space Studio",
      "address" : {
        "street" : "3574 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 307-5739",
      "website" : "http://sacredspacestudio.ca"
    }, {
      "studioId" : "34A36C12EFC94C3CB772B306FA748200",
      "name" : "Vancouver School of Yoga",
      "address" : {
        "street" : "300 - 342 Water Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 688-5060",
      "website" : "http://vancouverschoolofyoga.com"
    }, {
      "studioId" : "363E3A7508D34440A0A9062E947D5D47",
      "name" : "Spire Wellness",
      "address" : {
        "street" : "2885 W 33rd Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 569-0963",
      "website" : "http://s-pire.ca"
    }, {
      "studioId" : "36708A99F2684CDE8364A51BCA3B4FC8",
      "name" : "Yoga On The Flow",
      "address" : {
        "street" : null,
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 345-5008",
      "website" : "http://yogaontheflow.com"
    }, {
      "studioId" : "37F2305E29D5464895B3C87BB16AE526",
      "name" : "Yoga Buttons",
      "address" : {
        "street" : "2525 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-9642",
      "website" : "http://yogabuttons.com"
    }, {
      "studioId" : "3963DCC19E24435F8B61429D29215957",
      "name" : "Sivananda Yoga",
      "address" : {
        "street" : "708 W 16th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 880-2109",
      "website" : "http://sivananda.org"
    }, {
      "studioId" : "3B4ED530ABC242979E4AFF24348D85A7",
      "name" : "Sitka Physio & Wellness",
      "address" : {
        "street" : "900 W Georgia St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 558-2222",
      "website" : "http://www.vancouverphysiotherapy.com"
    }, {
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "name" : "Ron Zalko Total Body Fitness and Yoga",
      "address" : {
        "street" : "1807 W 1st Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 737-4355",
      "website" : "http://ronzalko.com"
    }, {
      "studioId" : "3D4C0F385CF34020A24A4F4D0C844D68",
      "name" : "Blond Monkey Yoga",
      "address" : {
        "street" : "4439 W 10th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 241-9642",
      "website" : null
    }, {
      "studioId" : "3E2B4F45B7C84F6CB354D15858969031",
      "name" : "YYoga West Sixth",
      "address" : {
        "street" : "1569 W 6th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 428-2523",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "40F95FE25E35427BAC2A4A8C4B1FBF7E",
      "name" : "Yoga Sukha",
      "address" : {
        "street" : "2111 16th Avenue W",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-9642",
      "website" : "http://yogasukha.ca"
    }, {
      "studioId" : "42851F2482D94163A10EA9E277FD856C",
      "name" : "Bikram Yoga Commercial Drive",
      "address" : {
        "street" : "1109 Commercial Dr",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 251-9642",
      "website" : "http://bikramyogacommercialdrive.com"
    }, {
      "studioId" : "43C02524FC104684A5DF080FA7236AC9",
      "name" : "Compasha Massage Yoga Holistics",
      "address" : {
        "street" : "1687 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 379-2047",
      "website" : "http://compasha.com"
    }, {
      "studioId" : "46798A0F7CAF4A0F80BA6E5FC71DECD8",
      "name" : "Eastside Fitness",
      "address" : {
        "street" : "5854 Fraser St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-1224",
      "website" : "http://eastsidefitness.ca"
    }, {
      "studioId" : "49E913FFD7814630BCD159D61BE9FC19",
      "name" : "Creekside Community Centre",
      "address" : {
        "street" : "1 Athletes Way",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 257-3050",
      "website" : "http://vancouver.ca/parks-recreation-culture/creekside-community-recreation-centre.aspx"
    }, {
      "studioId" : "4EED28BBA2A14D2FB8BCD628731C7DFB",
      "name" : "Sanga Yoga Studio",
      "address" : {
        "street" : "3458 Dunbar Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 733-7264",
      "website" : "http://sangayoga.ca"
    }, {
      "studioId" : "4EFEC9AE5CAA425F82C1A44FA934BA12",
      "name" : "Original Yin Qi Gong Gym",
      "address" : {
        "street" : "434 W 8th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 879-0881",
      "website" : null
    }, {
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "name" : "Semperviva Yoga - Sea Center",
      "address" : {
        "street" : "200-1333 Johnston St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-2087",
      "website" : "http://semperviva.com"
    }, {
      "studioId" : "538EF0A8A1ED425CA29BBFFB186BABAF",
      "name" : "Kalev Fitness Yaletown",
      "address" : {
        "street" : "840 Cambie Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-6006",
      "website" : "http://kalevfitness.com"
    }, {
      "studioId" : "58107E24D13A41DC89E5F81EFBE62E66",
      "name" : "Exhale Studio",
      "address" : {
        "street" : "1083 Cambie St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 689-2446",
      "website" : "http://exhalestudio.com"
    }, {
      "studioId" : "58A91E8210DF4BFA9290E487808A83DA",
      "name" : "Three Jewels Vancouver",
      "address" : {
        "street" : "9 E Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 685-9215",
      "website" : "http://threejewelsvancouver.com"
    }, {
      "studioId" : "5C155B013A164B7D958D9F08494132A0",
      "name" : "Yogacara Studios - Mount Pleasant Yoga",
      "address" : {
        "street" : "3381 Fraser St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-3334",
      "website" : "http://vancouveryogacara.com"
    }, {
      "studioId" : "65330975855341CBA444EF63DFB2F2E2",
      "name" : "Ashtanga Yoga Vancouver",
      "address" : {
        "street" : "2515 Burrard St #201",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 307-2644",
      "website" : "http://ashtangayogavancouver.com"
    }, {
      "studioId" : "65BBBB593C344F80B9BBECDFCCBCFF8A",
      "name" : "Ganja Yoga Vancouver",
      "address" : {
        "street" : "303 W Hastings Street, 2nd Floor",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 835-4137",
      "website" : null
    }, {
      "studioId" : "65F1D93564324799990A9A517AD3CB83",
      "name" : "Open Door Yoga",
      "address" : {
        "street" : "1651 Commercial Dr #245",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 371-8179",
      "website" : "http://opendooryoga.bc.ca"
    }, {
      "studioId" : "676BAF2013764538839121FCA703BCEA",
      "name" : "Yoga On 7th",
      "address" : {
        "street" : "156 7 Ave E",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 879-9642",
      "website" : "http://yogaon7th.com"
    }, {
      "studioId" : "6B723095332E42BF8EAA16D628589F38",
      "name" : "Kits Yoga",
      "address" : {
        "street" : "1807 West 1st Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 737-4355",
      "website" : "http://kitsyoga.ca"
    }, {
      "studioId" : "6CE22133C9C148839E93969601506E89",
      "name" : "Ohm Studios",
      "address" : {
        "street" : "199 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : null,
      "website" : null
    }, {
      "studioId" : "6FBC50F1DA774FB284E60DF7FCB5A4C9",
      "name" : "Tessa Yoga",
      "address" : {
        "street" : "251 East 11th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 927-0565",
      "website" : "http://tessayoga.ca"
    }, {
      "studioId" : "70958930615943C7826D2324DD81B985",
      "name" : "Prana Yoga College",
      "address" : {
        "street" : "200 E 2nd Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 682-2121",
      "website" : "http://pranayogacollege.com"
    }, {
      "studioId" : "7273F17F80BF4E97BB7F18270CF1887F",
      "name" : "Yoga For Anyone",
      "address" : {
        "street" : null,
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 764-6571",
      "website" : "http://yogaforanyone.com"
    }, {
      "studioId" : "7454A95DC89F4335AB89900884C5AC6C",
      "name" : "The Hot Box Yoga",
      "address" : {
        "street" : "3313 Shrum Lane",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "844-484-9642",
      "website" : "http://thehotboxyoga.com"
    }, {
      "studioId" : "75D0D24A6F3D474A9465AAD33623E515",
      "name" : "Champlain Heights Community Centre",
      "address" : {
        "street" : "3350 Maquinna Dr",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 718-6575",
      "website" : "http://vancouver.ca"
    }, {
      "studioId" : "7667C0647DFC4870A71D49D0F7FF4969",
      "name" : "Compasha",
      "address" : {
        "street" : "Suite 60 - 1687 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 379-2047",
      "website" : "http://compasha.com"
    }, {
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "name" : "Just Yoga",
      "address" : {
        "street" : "53 E Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 709-9642",
      "website" : "http://justyoga.ca"
    }, {
      "studioId" : "7819348A79114E8190D6D45AA4C7FB82",
      "name" : "YYoga Downtown Flow",
      "address" : {
        "street" : "888 Burrard St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 682-3569",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "79B0C5535741464188C37A018318C740",
      "name" : "Line 5 Pilates Studios",
      "address" : {
        "street" : "1 West Pender Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 558-1030",
      "website" : "http://line5studios.com"
    }, {
      "studioId" : "79CC56F7D39D419DAA762F08029D92CA",
      "name" : "Lotus Room Yoga",
      "address" : {
        "street" : "196 W 18th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 876-8550",
      "website" : null
    }, {
      "studioId" : "7A18361F4F3043069D51F8D67CC10853",
      "name" : "YYoga Yaletown",
      "address" : {
        "street" : "1050 Homer St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 684-3334",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "7ADA4D4E3C294B1E99EFAC5C212F01EF",
      "name" : "The Path Yoga Studio",
      "address" : {
        "street" : "240-2083 Alma Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 562-1944",
      "website" : "http://thepathyoga.com"
    }, {
      "studioId" : "7BC7B2F698C64C7F9CFE43683FDACFAE",
      "name" : "Chopra Yoga",
      "address" : {
        "street" : "451 Granville Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 424-9422",
      "website" : "http://choprayoga.com"
    }, {
      "studioId" : "7C016C8A4B794BAAAA9D55D03FDB4579",
      "name" : "YYoga South Granville",
      "address" : {
        "street" : "1627 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 736-6009",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "7E3339FBE24C4C329702D75A943FD647",
      "name" : "Padma Yoga & Meditation",
      "address" : {
        "street" : "1854 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 738-9981",
      "website" : "http://padmayoga.ca"
    }, {
      "studioId" : "8030056B072F4FB5B4A368BA65A2C3D5",
      "name" : "Green Room Yoga",
      "address" : {
        "street" : "2645 Hastings St E",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 318-4066",
      "website" : "http://greenroomyoga.ca"
    }, {
      "studioId" : "81F78CBB0A4E4B439BF2D4ADE6445623",
      "name" : "Mount Pleasant Infrared Yoga",
      "address" : {
        "street" : "Main Street and 16th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 345-5443",
      "website" : "http://mountpleasantinfraredyoga.com"
    }, {
      "studioId" : "823BE8A936D847C7960D60ACFEBC9C03",
      "name" : "Open Door Yoga Inc",
      "address" : {
        "street" : "6158 East Blvd",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 266-6040",
      "website" : "http://opendooryoga.bc.ca"
    }, {
      "studioId" : "8367810561D34F56967ADB64CD791896",
      "name" : "Urban Fitness Club South Granville",
      "address" : {
        "street" : "2213 Granville Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 428-5555",
      "website" : "http://urbanfitnessclub.com"
    }, {
      "studioId" : "85C2E70E04A046AB8F9920BDF83F8ADC",
      "name" : "Live Rich Fitness Co.",
      "address" : {
        "street" : null,
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 772-6305",
      "website" : "http://liverichfitness.com"
    }, {
      "studioId" : "86F8A5202FE7443DBF98E62C876B5EB7",
      "name" : "Vancouver Corporate Yoga",
      "address" : {
        "street" : "Royal Centre, 1055 W Georgia St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 267-9642",
      "website" : "http://vancouvercorporateyoga.com"
    }, {
      "studioId" : "87E2AD08ECB04BDA9299F030C2D7364E",
      "name" : "Spartacus Gym",
      "address" : {
        "street" : "1522 Commercial Drive",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 254-6267",
      "website" : "http://spartacusgym.ca"
    }, {
      "studioId" : "8833481C7FC34BE98E3FB6C2BB44F6F5",
      "name" : "West End Community Centre",
      "address" : {
        "street" : "870 Denman St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 257-8333",
      "website" : "http://westendcc.ca"
    }, {
      "studioId" : "8916CDD2165143E6BE6D964E1C54613C",
      "name" : "Dr. Thara Vayali, ND",
      "address" : {
        "street" : "1529 W 6th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 500-1888",
      "website" : "http://tharavayali.ca"
    }, {
      "studioId" : "89ADE80C9ED64E0084D94AA8BB061EC1",
      "name" : "The Curious Yogis",
      "address" : {
        "street" : "Yukon Street and 12th Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 230-3308",
      "website" : "http://thecuriousyogis.com"
    }, {
      "studioId" : "8CB5782303DC4D51AD169B9142464E34",
      "name" : "Good Karma Yoga",
      "address" : {
        "street" : "Suite 102 - 686 W Broadway St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 829-0440",
      "website" : null
    }, {
      "studioId" : "8DEAD34BCCDE4200B7285731344B3AAF",
      "name" : "Kerrisdale Yoga",
      "address" : {
        "street" : "6170 East Blvd",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 263-0008",
      "website" : "http://kerrisdaleyoga.com"
    }, {
      "studioId" : "908FAF0925F74725BFF6F2152F857A6A",
      "name" : "Urban Yoga",
      "address" : {
        "street" : "1705 - 5728 Berton Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : null,
      "website" : "http://urbanyoga.ca"
    }, {
      "studioId" : "90CF9D7C3C574384B9C3581824A0AB4A",
      "name" : "Semperviva Yoga Sun Studio",
      "address" : {
        "street" : "2608 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-2009",
      "website" : "http://semperviva.com"
    }, {
      "studioId" : "93EA8D448EF345F1BAE9FEF80712EE1D",
      "name" : "Alliance Wellness",
      "address" : {
        "street" : "1177 W Broadway",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 737-1177",
      "website" : "http://alliancewellness.ca"
    }, {
      "studioId" : "A0A8865E157D45D1A7E07249E996259C",
      "name" : "Yoga in Daily Life",
      "address" : {
        "street" : "223 W Broadway #200",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 646-0134",
      "website" : "http://vanyoga.com"
    }, {
      "studioId" : "A25CBE5034864BB58F6300FEF857A32E",
      "name" : "Open Door Yoga Inc",
      "address" : {
        "street" : "1111 Commercial Dr",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 677-4972",
      "website" : "http://opendooryoga.bc.ca"
    }, {
      "studioId" : "A2B7D9AD1F594CACB0DC7E67A5647C4D",
      "name" : "Maximum Core Cardio Studio Ltd.",
      "address" : {
        "street" : "3433 E Hastings Street",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-7853",
      "website" : "http://core-studio.ca"
    }, {
      "studioId" : "ABEE801FD1E7450F9990BC65549A0DF4",
      "name" : "WestCoast Hot Yoga",
      "address" : {
        "street" : "1128 Mainland St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 221-9642",
      "website" : "http://westcoasthotyoga.com"
    }, {
      "studioId" : "ACB68293A6954268A34731A5CAD8C6F9",
      "name" : "Family Passages",
      "address" : {
        "street" : "5737 Collingwood St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 266-6470",
      "website" : "http://familypassages.ca"
    }, {
      "studioId" : "AFC475F5B3194251AC046DCB54046B00",
      "name" : "Vancouver Yoga: Bloom Yoga Studio",
      "address" : {
        "street" : "8337 Granville St #220",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 370-4928",
      "website" : "http://bloomyogastudio.ca"
    }, {
      "studioId" : "B251C4AC467848F7AAB15098B3001E8E",
      "name" : "Moksha Yoga East Vancouver",
      "address" : {
        "street" : "560 E 15th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 569-3300",
      "website" : "http://east-vancouver.mokshayoga.ca"
    }, {
      "studioId" : "B3112F423A914A4BB5415B8DBA908C85",
      "name" : "Unity Yoga Teahouse",
      "address" : {
        "street" : "1672 10th Ave E 2nd floor ",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 708-8369",
      "website" : "http://unityyoga.ca"
    }, {
      "studioId" : "B54A9F2C05544049BC29524BA5BB9B18",
      "name" : "Form Body Lab",
      "address" : {
        "street" : "1008 Homer St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 687-6870",
      "website" : "http://formbodylab.com"
    }, {
      "studioId" : "B5727EA86FD2458F847C7F8ED5F4A39F",
      "name" : "Radha Yoga Vancouver",
      "address" : {
        "street" : "1529 W 6th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 889-1258",
      "website" : "http://radhavancouver.org"
    }, {
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "name" : "Bikram Yoga Vancouver",
      "address" : {
        "street" : "City Square Shopping Centre, #22 - 555 W 12th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-0688",
      "website" : "http://www.bikramyogavancouver.com"
    }, {
      "studioId" : "BB82527DA4354EAE955D418E5DA4F17E",
      "name" : "Inner Truth Yoga",
      "address" : {
        "street" : "1160 Davie Street, 3rd Fl Sandman Suites Hotel",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 726-6967",
      "website" : "http://innertruthyoga.org"
    }, {
      "studioId" : "C091D4E47960459FA9B08C204413D4D5",
      "name" : "The Yoga Space",
      "address" : {
        "street" : "677 E 27th",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 876-9600",
      "website" : "http://theyogaspace.ca"
    }, {
      "studioId" : "C10A6457B48A49F4814CD8FE178F9F65",
      "name" : "Karma Teachers",
      "address" : {
        "street" : "45 West Hastings",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 700-6489",
      "website" : "http://karmateachers.com"
    }, {
      "studioId" : "C50AACDE4B0A4874A72A3D7B40AC5FF0",
      "name" : "Siddha Yoga Meditation Ctr",
      "address" : {
        "street" : "2780 Broadway E",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 255-7960",
      "website" : null
    }, {
      "studioId" : "C5EF49407CAE4FA1BD9D3AD88EB97331",
      "name" : "Bikram's Yoga",
      "address" : {
        "street" : "2480 Spruce St",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-2445",
      "website" : "http://bikramyogavancouver.com"
    }, {
      "studioId" : "C708D8B02B924D40A743F6168D0CEA8D",
      "name" : "Open Door Yoga Inc",
      "address" : {
        "street" : "E 15th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 371-8179",
      "website" : "http://opendooryoga.bc.ca"
    }, {
      "studioId" : "C9D32524BF0C4751B0ADB34F4A9B77F9",
      "name" : "Elevate Qi Health",
      "address" : {
        "street" : "1764 W 7th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(778) 847-9642",
      "website" : "http://elevateqihealth.com"
    }, {
      "studioId" : "CCF0311C6D5549F4A7C4DE1C3DFADE94",
      "name" : "YogaOne BC",
      "address" : {
        "street" : "3103 E 45th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 375-2871",
      "website" : null
    }, {
      "studioId" : "CD319F0FE65649C1A93567B475B3A3B7",
      "name" : "Semperviva Yoga - City Center",
      "address" : {
        "street" : "1985 W Broadway #100",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-2009",
      "website" : "http://semperviva.com"
    }, {
      "studioId" : "CD385849B93146BF95353C528C15C8FB",
      "name" : "Vital Health Medical & Wellness Clinic",
      "address" : {
        "street" : "1855 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 558-4825",
      "website" : "http://vitalwellnessgroup.com"
    }, {
      "studioId" : "CDAE6FF393FE4FB7939E9A8EE1A3497D",
      "name" : "YYoga Kitsilano",
      "address" : {
        "street" : "1915 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 336-4599",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "D2FF2143DDB348849AA108914BAACA81",
      "name" : "Gold's Gym University Market Place",
      "address" : {
        "street" : "2155 Allison Rd",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 224-4699",
      "website" : "http://goldsgymbc.ca"
    }, {
      "studioId" : "D3DF134736824E1D90B1FE55F72CC496",
      "name" : "YYoga",
      "address" : {
        "street" : "1650 W 2nd Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 736-6002",
      "website" : "http://yyoga.ca"
    }, {
      "studioId" : "D8E69AACAE294BCABDCB4334719FF7FF",
      "name" : "Ommamma Yoga",
      "address" : {
        "street" : "2631 E 21st Avenue",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 943-3221",
      "website" : "http://ommammayoga.ca"
    }, {
      "studioId" : "D95637308CDD460490046AB0DDD98DFC",
      "name" : "Full Circle Studio",
      "address" : {
        "street" : "101-1183 Odlum Drive",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 566-0053",
      "website" : "http://fullcirclestudio.com"
    }, {
      "studioId" : "DA863B29C669429B961A7B6B46BC401A",
      "name" : "Dahn Energy Training",
      "address" : {
        "street" : "1765 8th Avenue W",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 714-0074",
      "website" : null
    }, {
      "studioId" : "DEF2F6A8D60742AF9EC8B0015F28D699",
      "name" : "Main Street Physiotherapy Clinic",
      "address" : {
        "street" : "4817 Main St #1",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 568-2744",
      "website" : "http://mainstreetphysio.ca"
    }, {
      "studioId" : "E0E0739046D24AC384BED7B54084A919",
      "name" : "Semperviva Yoga",
      "address" : {
        "street" : "2201 W 4th Ave",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 739-2088",
      "website" : "http://semperviva.com"
    }, {
      "studioId" : "E9248489ECED44E3A72920A2BDB6917B",
      "name" : "Glo Pilates and Yoga Inc.",
      "address" : {
        "street" : "1033 Marinaside Crescent",
        "city" : "Vancouver",
        "postalCode" : null,
        "province" : "British Columbia",
        "country" : "Canada"
      },
      "phone" : "(604) 719-2367",
      "website" : null
    }
  ];

  classes = [ 
    {
      "classId" : "00A7471CC0CC43988B55AD5C14E37BB1",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "tue",
      "time" : "16:30"
    }, {
      "classId" : "02B55822B202463AAB2F070C0413FD4E",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "22:00"
    }, {
      "classId" : "02D0B5C4D4CB439AAEC6E7A6A117F966",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "fri",
      "time" : "18:30"
    }, {
      "classId" : "0358B370EEBE474A97338AFC138DED50",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "18:15"
    }, {
      "classId" : "0446DFFA6B6342CE8C400F0A489CCEF7",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "thu",
      "time" : "16:15"
    }, {
      "classId" : "0B13956A82B442D9818DF99B472C76DF",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "18:00"
    }, {
      "classId" : "156896B51E214370925851D9CAD63AEC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "18:15"
    }, {
      "classId" : "16F2F2D679B241299B719A7630CA8B74",
      "name" : "Flow",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "12:30"
    }, {
      "classId" : "17B8FE6594E34CD592CF3750C14B283A",
      "name" : "Pilates",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Pilates",
      "day" : "sun",
      "time" : "11:30"
    }, {
      "classId" : "1832492FE9084ACCB6FC10A9D490B421",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "12:00"
    }, {
      "classId" : "1947A7F86E424B8D88C05CB64A3ACEA4",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "09:15"
    }, {
      "classId" : "195B1623AA814D0D9BAF200920B8B882",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "17:45"
    }, {
      "classId" : "2034E36A7BCF429BB7FC7C246C5976C2",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "17:45"
    }, {
      "classId" : "24BDA033DAD24A30921C045DE92088E9",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "12:00"
    }, {
      "classId" : "24D8CA04A5A54F85B7D0D6FED28CCF75",
      "name" : "Restorative",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Restorative",
      "day" : "fri",
      "time" : "19:30"
    }, {
      "classId" : "26751F927B304229AE778BCAB0E6DE9C",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "18:15"
    }, {
      "classId" : "271A96AFDDC64C5CA8F218BC6EAF29B8",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "09:30"
    }, {
      "classId" : "28B2720256274EFB9C60F4C536603496",
      "name" : "Pilates",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Pilates",
      "day" : "wed",
      "time" : "19:30"
    }, {
      "classId" : "2BC3761118674E1A91D4EE3DAF543B74",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "mon",
      "time" : "08:15"
    }, {
      "classId" : "2BCA70AA83644D4CAA2915567ED41810",
      "name" : "Restorative",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Restorative",
      "day" : "thu",
      "time" : "20:30"
    }, {
      "classId" : "2DEC8297982C4A2D81A0F934D21FD5BD",
      "name" : "Yin",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Yin",
      "day" : "thu",
      "time" : "19:15"
    }, {
      "classId" : "2FEF3EBA52B9427B94226F2BC19027E2",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "10:00"
    }, {
      "classId" : "337A0D8F6E8A4DBBAC167C255DD7E757",
      "name" : "Pilates",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Pilates",
      "day" : "thu",
      "time" : "19:45"
    }, {
      "classId" : "339CEE2407B44508B70BBE269AD3BA8D",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "17:45"
    }, {
      "classId" : "3551C4EF8BB846E18210C91C5FA1B00D",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "10:00"
    }, {
      "classId" : "3898799D424B4B25BF3A4E523D61B381",
      "name" : "Flow",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "08:15"
    }, {
      "classId" : "3F24356435904092A7B99254F0A1FD14",
      "name" : "Yin",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Yin",
      "day" : "mon",
      "time" : "19:30"
    }, {
      "classId" : "416A3545825043628E6A77BA6A51F97A",
      "name" : "Yoga Pilates Fusion",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Pilates",
      "day" : "mon",
      "time" : "16:30"
    }, {
      "classId" : "41C11CDA04DF4316829F4DE87ABCAE47",
      "name" : "Yin & Meditation",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Yin",
      "day" : "sun",
      "time" : "19:30"
    }, {
      "classId" : "451F8485D54E4D82858233286B5C08DF",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "12:00"
    }, {
      "classId" : "4645D34D2385406DB7464A3549A37B02",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "22:00"
    }, {
      "classId" : "47D624356FFD49F59E4A4F96858B0235",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "16:15"
    }, {
      "classId" : "49A909D598D74C3FB756089B0EA75F23",
      "name" : "Core 40 - Intermediate",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "12:00"
    }, {
      "classId" : "4ABC1EC4584A49F685460CE36F3D412D",
      "name" : "Hatha II",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "10:45"
    }, {
      "classId" : "4BA62957D33E4EF6AC6460ED10FD17EE",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "17:45"
    }, {
      "classId" : "4D96A65822284E47BB5587A721882BAC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "20:15"
    }, {
      "classId" : "4E83B54C04E24496929AD4E81331A009",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "17:45"
    }, {
      "classId" : "4F00344F414C430FAE46092F41916061",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "14:00"
    }, {
      "classId" : "52861119C44745FE85669E5DDFF660F5",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "20:15"
    }, {
      "classId" : "561D18537EF44982A8B6D328A856A209",
      "name" : "Hatha I",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "09:00"
    }, {
      "classId" : "563BD5E661D94A5B8F09BD56548713CA",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "thu",
      "time" : "09:30"
    }, {
      "classId" : "58E0F65063804997A3B6108CA3444BC2",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "06:00"
    }, {
      "classId" : "5CF830F0157C433087580AEEF0065604",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "18:15"
    }, {
      "classId" : "5D5F7E453FFC4DB199DB9361F4A8B96F",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "09:30"
    }, {
      "classId" : "5EAB5BE32AAA4B3F8D90ACEECFD1880B",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "12:00"
    }, {
      "classId" : "5ED93EE4BC9E4CF991A2688C3A0A4B49",
      "name" : "Restorative",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Restorative",
      "day" : "thu",
      "time" : "18:00"
    }, {
      "classId" : "609CDDF0E3FE47BB883EF67AD2073619",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "thu",
      "time" : "17:45"
    }, {
      "classId" : "634EBC9CD1554AC984629B10688A419F",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "12:00"
    }, {
      "classId" : "667D5D881A514A5DB73D6C011A6FA7D8",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "11:00"
    }, {
      "classId" : "68B01C6D096D4DA097A1940E152ADA5B",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "19:15"
    }, {
      "classId" : "6900645520FE4FBF8F5F5EFBBF64A9D3",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "16:15"
    }, {
      "classId" : "702AF98AA96C439ABBF98D1EC34FDBBC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "14:00"
    }, {
      "classId" : "7706469EC3CB451F80673EDD41D8FBA0",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "20:15"
    }, {
      "classId" : "77293FEE9DB6413E8E5E9B5354FF6FC8",
      "name" : "Hatha",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "08:15"
    }, {
      "classId" : "7A24624A63CA41D5A4F9C940245A5333",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "19:15"
    }, {
      "classId" : "7A567A4340E94FB8BDA5E68BCFD07207",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "14:00"
    }, {
      "classId" : "7A5CBBF111C64DFF887521957B5B4094",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "14:00"
    }, {
      "classId" : "7C611DD3555A4584AC90613276C1A314",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "06:00"
    }, {
      "classId" : "7CA979FC527746C0B082BBA82D6DD427",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "thu",
      "time" : "08:15"
    }, {
      "classId" : "7E790553A39744518858B01733444F6A",
      "name" : "Yin",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Yin",
      "day" : "wed",
      "time" : "18:00"
    }, {
      "classId" : "7ED34B75B87744728C736AD4F55A50B6",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "14:00"
    }, {
      "classId" : "7FBCC4DF8E2B4BDD8BD575CEDCB0FC14",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "mon",
      "time" : "18:30"
    }, {
      "classId" : "809CCEB21749499F94C57E4F222047B4",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "16:15"
    }, {
      "classId" : "832B4965DF7043188BCB0E75BB89B8E4",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "14:00"
    }, {
      "classId" : "8698D14836BC4892B1BACA9B4952F700",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "12:00"
    }, {
      "classId" : "87C0DF61A58B4945BC80A8AC858D6C00",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "11:00"
    }, {
      "classId" : "8837C19D814C43C4BF8FE4048D38935E",
      "name" : "Pilates Core Challenge",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Pilates",
      "day" : "sat",
      "time" : "10:30"
    }, {
      "classId" : "8981C4B810D14185BA3E7EE1D5C99F39",
      "name" : "50+",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "50+",
      "day" : "mon",
      "time" : "16:30"
    }, {
      "classId" : "8A4266ABACEC474EB0932ABFF23862E9",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "18:15"
    }, {
      "classId" : "8D929640EFAC447BAACC94D428FBAF56",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "19:15"
    }, {
      "classId" : "914F038044954259B17993A804C28DBC",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "09:30"
    }, {
      "classId" : "94A358BEBF454EBA9EF49E6890EA2C4D",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "16:15"
    }, {
      "classId" : "95BBA65342004CA891831A5B1C4B3BEF",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "18:00"
    }, {
      "classId" : "99E96FAC294F457D885E4F5CDA78281B",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "16:15"
    }, {
      "classId" : "9A396F0B05594159AF3CD743551633C0",
      "name" : "Qigong",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Qigong",
      "day" : "thu",
      "time" : "13:00"
    }, {
      "classId" : "9A54644EE5E84DFA9FB64767E54E6C8F",
      "name" : "Power",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Power",
      "day" : "sat",
      "time" : "08:15"
    }, {
      "classId" : "9B46A862B06346BD8C0D2EB2E4BE10CE",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "09:30"
    }, {
      "classId" : "A56813E7C5FB49DDA06F333461141545",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "09:30"
    }, {
      "classId" : "A5E49CE4575E4456B3A843A405816295",
      "name" : "Core 40 - Intermediate",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "07:45"
    }, {
      "classId" : "A99E9C8C71144F5282272AF61D4ED6C9",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "09:30"
    }, {
      "classId" : "ADF311A4E2DC43F6BFCF06051D9502A9",
      "name" : "Hatha",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "20:30"
    }, {
      "classId" : "AF1C4183BFB04FE98F38003E49F426BC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "16:15"
    }, {
      "classId" : "BA45984412AC4C29B491741A31E8ADDD",
      "name" : "Qigong and Meditation",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Qigong",
      "day" : "sun",
      "time" : "11:00"
    }, {
      "classId" : "BBF464B8BE9F4E8B89D3A1F0257A2A72",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "22:00"
    }, {
      "classId" : "BCCA9482B1CC48E28A1180D0D4E818BC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "20:15"
    }, {
      "classId" : "BF3F314EAA5C4910B6A28A5B50F26AAC",
      "name" : "Hatha",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "20:30"
    }, {
      "classId" : "C04CA74DE724412188107B90954ACE61",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "thu",
      "time" : "12:00"
    }, {
      "classId" : "C1B9072058EA426DADE10A8E365D44DC",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "20:15"
    }, {
      "classId" : "C1E57E1E4DA74E5EAEDC3CB3B7695733",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "20:15"
    }, {
      "classId" : "C1EA064539644CE689BBD5F8F7BAAF74",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "16:15"
    }, {
      "classId" : "C44E5C9EDE8943DCAAC3C83762EF7C5B",
      "name" : "Restorative",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Restorative",
      "day" : "sun",
      "time" : "10:30"
    }, {
      "classId" : "C4CE5D815EFB4FF1B5498A24FCFF052F",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "16:15"
    }, {
      "classId" : "C627D1DCCD83435BA6ECE415450DDF82",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sun",
      "time" : "09:30"
    }, {
      "classId" : "C63DD4CB31B14576A60141FD074C7ED6",
      "name" : "Hatha II + mediation",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "19:45"
    }, {
      "classId" : "C7DCADA7BD5548098B72753023576987",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "09:30"
    }, {
      "classId" : "CBBEF805728E468982FE05244B1AA6A5",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "22:00"
    }, {
      "classId" : "CFAAD143B6BF49578A84DB9508645003",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "06:00"
    }, {
      "classId" : "CFE31670E3BE40ABBE5CB56730925133",
      "name" : "Beginners Hatha",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "18:00"
    }, {
      "classId" : "D13EE45C145D46FEBB4B3C6ADEEEB4FE",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "fri",
      "time" : "17:45"
    }, {
      "classId" : "D5E8CEDCAE3D4B10B841FDFA537E743C",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "wed",
      "time" : "12:00"
    }, {
      "classId" : "D5F769E807FC49B8A7E79B22FB25CF2D",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "mon",
      "time" : "09:30"
    }, {
      "classId" : "D966310FCF674BA28B32492CC1B05EDB",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "08:00"
    }, {
      "classId" : "D9C3DAB655504920B8D4149A5C41210A",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "18:15"
    }, {
      "classId" : "D9E77A3664C9457E8E095E9DAD8086E6",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "fri",
      "time" : "16:15"
    }, {
      "classId" : "DB7E2971BCAF4CE68F8D901CD3679302",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sat",
      "time" : "16:15"
    }, {
      "classId" : "E245B648057E479D88ED3449546058A6",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "08:00"
    }, {
      "classId" : "E3F7E4793C3042CEBE0DD5DE10675D29",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "06:00"
    }, {
      "classId" : "E46A180345524660B2A096926EDA81AE",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "sat",
      "time" : "08:00"
    }, {
      "classId" : "E6971B6058E144F0B91BB08F532994C3",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "09:30"
    }, {
      "classId" : "E6AF6AE7B44F4AA587AD625335A5CEBE",
      "name" : "Yin",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Yin",
      "day" : "tue",
      "time" : "13:00"
    }, {
      "classId" : "E7845AE79E9A4DA9893C959E1651D644",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "12:00"
    }, {
      "classId" : "E7FFA27456E4496D826F194D3FED156A",
      "name" : "Yoga Pilates Fusion",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Pilates",
      "day" : "tue",
      "time" : "20:30"
    }, {
      "classId" : "E96D658B2B7D4E8BB967ED3337C8F54B",
      "name" : "Flow",
      "studioId" : "3CEB5FA00DAF48168008BE5157F3F651",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "08:15"
    }, {
      "classId" : "E9ED92072F054D8C89CB2C866F3CAE0F",
      "name" : "Restorative",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Restorative",
      "day" : "mon",
      "time" : "13:00"
    }, {
      "classId" : "EAC011D4759246D1BE7967EC7AD7ECF0",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "06:00"
    }, {
      "classId" : "EBE9278794134AD58B823AB1399A4BBD",
      "name" : "Hatha All Levels",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Hatha",
      "day" : "wed",
      "time" : "19:45"
    }, {
      "classId" : "ECA37214812C4BFEBCD5CCF34B92A00B",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "12:00"
    }, {
      "classId" : "F31771A65991420D990CDDA2FF53CCBD",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "tue",
      "time" : "16:15"
    }, {
      "classId" : "F51AC9B58ABD48069BE5F4A7B8A14EA1",
      "name" : "Hatha",
      "studioId" : "4F630A115C6A4E3FA2EA60BDF08A9D6C",
      "style" : "Hatha",
      "day" : "tue",
      "time" : "17:45"
    }, {
      "classId" : "F8269111170D4999B94DBFAE6677B20F",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "sun",
      "time" : "14:00"
    }, {
      "classId" : "F997B6E0954345B792C01075B2FA1C0B",
      "name" : "Kundalini 'Lite'",
      "studioId" : "76BEA9C9C08B40BDA95EC8929B06F339",
      "style" : "Kundalini",
      "day" : "wed",
      "time" : "12:00"
    }, {
      "classId" : "FB2FE9A6C4FB452D9F119FF96C84D833",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "mon",
      "time" : "20:15"
    }, {
      "classId" : "FE2CB971BF1D476997C4547D81662854",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "18:15"
    }, {
      "classId" : "FE5A1F31374F421B8D49EB2F21823061",
      "name" : "Bikram",
      "studioId" : "B6712F2A5C82417B9B65A119F6CA6C7C",
      "style" : "Bikram",
      "day" : "thu",
      "time" : "09:30"
    }
  ];
})();