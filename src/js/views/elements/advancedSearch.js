define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var advancedSearchViewEl = Backbone.View.extend({
        el: "body",
        displaying: null,
        drawerEl: null,
        sticky: false,

        /**
         * Hide the search drawer if its showing.
         */
        hide: function() {
            if(this.displaying !== null && this.displaying) {
                this.toggleDrawer();
            }
        },

        /**
         * By "Sticky", I mean make the advanced search stick to the top of the page
         * and not scroll with the page.
         */
        makeSticky: function() {
            if(!this.sticky) {
                if(this.drawerEl !== null) {
                    this.drawerEl.addClass('sticky');
                }

                this.sticky = !this.sticky;
            }
        },

        /**
         * Handle what we do when the user touches a button.
         */
        onButtonClick: function(button) {
            this.toggleDrawer();

            var amenities = $("input[name='amenities[]']:checkbox:checked").map(function(){
                return $(this).val();
            }).get(); // <----
            console.log('Amenities: ', amenities);

            var propertyTypes = $("input[name='propertyTypes[]']:checkbox:checked").map(function(){
                return $(this).val();
            }).get(); // <----
            console.log('Property Types: ', propertyTypes);

            var formField = $('#searchBar input');
            if(button.hasClass('blue') && formField.length) {
                Navigate.toUrl('/search/'+ formField.val());
            }
        },
        
        /**
         * Make the advanced search move along with the page scroll.
         */
        removeSticky: function() {
            if(this.sticky) {
                if(this.drawerEl !== null) {
                    this.drawerEl.removeClass('sticky');
                }

                this.sticky = !this.sticky;
            }
        },

        render: function() {
            this.$el.append(JST['src/js/templates/elements/advancedSearch.html']({
                apartmentAmenities: JST['src/js/templates/elements/optionsApartmentAmenities.html'](),
                communityAmenities: JST['src/js/templates/elements/optionsCommunityAmenities.html'](),
                petAmenities: JST['src/js/templates/elements/optionsPetAmenities.html'](),
                propertyTypesAmenities: JST['src/js/templates/elements/optionsPropertyTypesAmenities.html'](),
                photosVideosAmenities: JST['src/js/templates/elements/optionsPhotosVideosAmenities.html'](),
            }));
            this.displaying = false;
            this.drawerEl = $(document.getElementById('advancedSearch'));
            $('#advancedSearch').on({'mousewheel': function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
            // If the drawer is on a view where it needs to remain at the top of the page, then make that setting now.
            if(this.sticky) {
                this.drawerEl.addClass('sticky');
            }

            this.setEvents();


        },

        /**
         * Set events related to this view element.
         */
        setEvents: function() {
            var _this = this;
            this.drawerEl.find('button').bind(touchEventType, function() {
                _this.onButtonClick($(this));
            });
        },

        slideDrawer: function(newHeight) {
            if(newHeight === 0) {
                this.drawerEl.removeClass('show');
            } else {
                this.drawerEl.addClass('show');
            }

            this.drawerEl.css('height', newHeight +'px');
        },

        /**
         * Toggle the advanced search drawer to display or hide.
         */
        toggleDrawer: function() {
            var newHeight = $(window).height();
            if(this.displaying === true) {
                newHeight = 0;
                $('#teaser, footer').animate({
                    opacity: 1
                }, function(){

                });

                $('#gallery').css({
                    "-webkit-filter" : 'blur(0px)',
                    "-moz-filter" : 'blur(0px)',
                    "-MS-filter" : 'blur(0px)',
                    "filter" : 'blur(0px)',
                    "-o-filter" : 'blur(0px)'
                });
            }
            else{
                $('#teaser, footer').animate({
                    opacity: 0
                }, function(){

                });

                $('#gallery').css({
                    "-webkit-filter" : 'blur(10px)',
                    "-moz-filter" : 'blur(10px)',
                    "-MS-filter" : 'blur(10px)',
                    "filter" : 'blur(10px)',
                    "-o-filter" : 'blur(10px)'
                });
            }

            if(this.drawerEl === null) {
                this.render();

                // Take a breath for the DOM to catch up.
                var _this = this;
                setTimeout(function() {
                    _this.slideDrawer(newHeight);
                }, 250);
            } else {
                this.slideDrawer(newHeight);
            }

            this.displaying = !this.displaying;
        }
    });

    return new advancedSearchViewEl();
});