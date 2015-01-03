angular.module('classFilters', []).filter('weekday', function() {
  return function(input) {
    var weekday = undefined;

    switch(input) {
      case "sun":
        weekday = "Sunday";
        break;
      case "mon":
        weekday = "Monday";
        break;
      case "tue":
        weekday = "Tuesday";
        break;
      case "wed":
        weekday = "Wednesday";
        break;
      case "thu":
        weekday = "Thursday";
        break;
      case "fri":
        weekday = "Friday";
        break;
      case "sat":
        weekday = "Saturday";
        break;
    }

    return weekday;
  };
});