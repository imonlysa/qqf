var resultArray = [
    {"Basic city driving - Compact": 50},
    {"Basic city driving - Midsize": 45},
    {"Basic city driving - Full-size": 40},
    {"Basic city driving - SUV": 35},
    {"Basic city driving - Luxury": 35},
    {"Long road trips - Compact": 70},
    {"Long road trips - Midsize": 65},
    {"Long road trips - Full-size": 60},
    {"Long road trips - SUV": 55},
    {"Long road trips - Luxury": 55},
    {"Luxury or special occasions - Compact": 90},
    {"Luxury or special occasions - Midsize": 85},
    {"Luxury or special occasions - Full-size": 80},
    {"Luxury or special occasions - SUV": 75},
    {"Luxury or special occasions - Luxury": 75},
    {"Off-road adventures - Compact": 120},
    {"Off-road adventures - Midsize": 115},
    {"Off-road adventures - Full-size": 110},
    {"Off-road adventures - SUV": 105},
    {"Off-road adventures - Luxury": 105},
    {"Business travel - Compact": 150},
    {"Business travel - Midsize": 145},
    {"Business travel - Full-size": 140},
    {"Business travel - SUV": 135},
    {"Business travel - Luxury": 135},
];

var getArray = [];
(function($) {
    function scrollToDiv() {
        $('html, body').animate({
            scrollTop: $('.survey-step.active').offset().top
        }, 400);
    }

    $(document).ready(function() {
        $('.previous-button, .prev-button').on('click', function() {
            if ($(this).closest('.survey-step').prev('.survey-step').length == 1) {
                $(this).closest('.survey-step').removeClass('active').prev().addClass('active');
            }
            scrollToDiv();
        });

        $('.next-button').on('click', function() {
			getArray = [];
			console.log("Next button clicked");
		
			if ($(this).closest('.survey-step').next('[data-slug="result"]').length == 0) {
				$(this).closest('.survey-step').removeClass('active').next().addClass('active');
			} else {
				$(this).closest('.survey-step').removeClass('active').next('.survey-step').addClass('active');
				
				resultArray.forEach(function(key) {
					$('[name*="step_1"]').each(function() {
						if ($(this).is(':checked')) {
							var selectedValue = $(this).attr('data-value') + ' - ' + $('[name="step_2"]:checked').attr('data-value');
							if (key[selectedValue] !== undefined) {
								console.log("Adding value:", key[selectedValue]);
								getArray.push(key[selectedValue]);
							}
						}
					});
				});
		
				console.log("Values in getArray:", getArray);
		
				var largest = getArray[0];
				for (var i = 1; i < getArray.length; i++) {
					if (largest < getArray[i]) {
						largest = getArray[i];
					}
				}
				console.log("Largest value found:", largest);
				
				if (largest !== undefined && largest !== null) {
					$('.car-value').html(largest + '€ per day');
				}
			}
			scrollToDiv();
		});
		

        $('.back-to-start').on('click', function(e) {
            e.preventDefault();
            $('[data-slug="introduction"]').addClass('active').siblings().removeClass('active');
            $('.survey-step input[type="checkbox"]:checked').prop('checked', false);
            $('.survey-step input[type="radio"]:checked').prop('checked', false);
            scrollToDiv();
            getArray = [];
        });
    });
}(jQuery));
