/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    $('#ratingForm').submit(function(event){
        event.preventDefault();
        $('#loaderHolder').show();
        var data = new FormData();
        data.append('image', $('#photo')[0].files[0]);
        var url = 'https://tiktokhot.azurewebsites.net/api/classify?code=WKdDWUMfuFd8k/YKntvMhQC1uOTxpxGuEEOuEZ36XaRg0FidnazwNg==';
        $.ajax({url: url, 
            data: data,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function(result){
                $('#loaderHolder').hide();
                $('#resultsHolder').show();
                $('#resultText').text(
                    'The algorithm gave this picture a score of ' +
                    Math.round(result['score'] * 100)/100 +
                    ' out of 5, which is at the '
                    + result['percentile'] * 100 +
                    'th percentile.'
                )
            }
        })
    });

    $('#photo').on('change', function(){
        var reader = new FileReader();
        reader.onloadend = function(event) {
            $('#preview').attr('src', event.target.result);
            //.css({'background-image':             'url(' + event.target.result + ')'});
        }
        var files = $('#photo')[0].files;
        if(files && files.length > 0){
            $('#preview').show();
            reader.readAsDataURL(files[0]);
        }
    })

})(jQuery); // End of use strict
