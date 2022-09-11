
jQuery(document).ready(function($) {

	'use strict';
    //***************************
    // Sticky Header Function
    //***************************
	  jQuery(window).scroll(function() {
	      if (jQuery(this).scrollTop() > 170){  
	          jQuery('body').addClass("findhome-sticky");
	      }
	      else{
	          jQuery('body').removeClass("findhome-sticky");
	      }
	  });
    
    //***************************
    // BannerOne Functions
    //***************************
      jQuery('.touristpoint-banner').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          arrows: false,
          fade: true,
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });

    //***************************
    // Fancybox Function
    //***************************
    jQuery(".fancybox").fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',
    });

    $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })

    //***************************
    // Parent AddClass Function
    //***************************
    jQuery(".touristpoint-sub-menu").parent("li").addClass("sub-menu-icon");

    //***************************
    // Map Toggle Function
    //***************************
    jQuery( '.open-btn' ).on("click", function() {
        jQuery( '.findhome-main-wrapper' ).addClass('property-search-active');
        jQuery( '.findhome-property-search' ).addClass('property-search-active');
    });
    jQuery( '.close-btn' ).on("click", function() {
        jQuery( '.findhome-main-wrapper' ).removeClass('property-search-active');
        jQuery( '.findhome-property-search' ).removeClass('property-search-active');
    });


    //***************************
    // partner Functions
    //***************************
    jQuery('.findhome-partner-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        arrows: false,
        responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      });

  //***************************
    // footer strip Functions
    //***************************
    jQuery('.findhome-footer-strip-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
        nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
        responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      });

    //***************************
      // ThumbSlider Functions
      //***************************
      jQuery('.findhome-images-thumb').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.findhome-images-list'
          });
          jQuery('.findhome-images-list').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.findhome-images-thumb',
            dots: false,
            vertical: false,
            prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
            nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
            centerMode: false,
            focusOnSelect: true,
            responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      vertical: false,
                    }
                  },
                  {
                    breakpoint: 800,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      vertical: false,
                    }
                  },
                  {
                    breakpoint: 400,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      vertical: false,
                    }
                  }
                ],
          });

    //***************************
    // Click to Top Button
    //***************************
    jQuery('.findhome-back-top').on("click", function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    //***************************
    // slider Functions
    //***************************
      $( function() {
          $( "#slider-range2" ).slider({
            range: true,
            min: 0,
            max: 2000,
            values: [ 0, 1000 ],
            slide: function( event, ui ) {
              $( "#amount2" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
          });
          $( "#amount2" ).val( "$" + $( "#slider-range2" ).slider( "values", 0 ) +
            " - $" + $( "#slider-range2" ).slider( "values", 1 ) );
        } );

      $( function() {
          $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 2000,
            values: [ 0, 1000 ],
            slide: function( event, ui ) {
              $( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
          });
          $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );
        } );

      //***************************
    // Progressbar Function
    //***************************
    jQuery('.progressbar1').progressBar({
      percentage : false,
      animation : true,
      backgroundColor : "#ececec",
      barColor : "#004274",
      height : "5",
    });


});



// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"saturation":"-34"},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#156789"},{"visibility":"on"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: 'Snazzy!'
    });
}

//********************************
// Mediaelementplayer Function
//********************************
jQuery('video').mediaelementplayer({
  success: function(player, node) {
    jQuery('#' + node.id + '-mode').html('mode: ' + player.pluginType);
  }
});