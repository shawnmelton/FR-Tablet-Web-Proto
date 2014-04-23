define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'views/elements/footer',
    'tools/navigate', 'tools/data', 'views/elements/propertyGallery', 'views/elements/guestCardForm','models/listing','collections/listings'],
    function($, Backbone, tmplts, searchBarViewEl, footerViewEl, Navigate, Data, galleryViewEl, guestCardFormEl, ListingModel, ListingCollection){
    var propertyView = Backbone.View.extend({
        el: "#content",
        property: null,
        moreEl: null,
        moreContentEl: null,
        contentHeight: 0,
        linksInactive: true,

        /**
         * Load the content specific to the section that was clicked on.
         */
        loadSection: function(section) {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
                this.moreContentEl = $(document.getElementById('moreContent'));
            }

            // Load content from template instead.
            switch(section) {
                case 'floorplans': 
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyFloorPlans.html']());
                    break;

                case 'reviews':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyReviews.html']());
                    break;

                case 'details':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyDetails.html']({
                        property: this.property
                    }));
                    break;

                case 'map':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyMap.html']({
                        propertyAddress: this.property.address
                    }));
                    break;
            }
        },

        /**
         * Move down the page to the more section for additional property content.
         */
        moveToMore: function() {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
                this.moreContentEl = $(document.getElementById('moreContent'));
            }

            var moreElTopPos = this.moreEl.position().top;

            // Don't scroll to the More section unless the user isn't close.
            if($('body').scrollTop() < (moreElTopPos - 50)) {
                console.log("Body");
                $('body').animate({
                    scrollTop: moreElTopPos +'px'
                },  500);
            }
        },

        /**
         * Handle what happens when the user clicks on the Check Availability button in the
         * property teaser.
         */
        onCheckAvailabilityClick: function() {
            this.moveToMore();
        },

        onCloseVideoButtonClick: function(){
            $('#video_lightbox').removeClass('show');
            $('body').unbind('mousewheel');
        },

        /**
         * Show video lightbox and load video
         */
        onVideoThumbnailClick: function() {
            $('#video_lightbox').addClass('show');
            video.play();
            if(isMobileDevice){
                console.log('Mobile Device!');
            }
            else{
                $('body').on({'mousewheel': function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        },

        /**
         * Catch the event when the user clicks on a section of the Property teaser
         * Teaser is the section that displays on top of the property image.
         */
        onTeaserSectionClick: function(pEl) {
            footerViewEl.setCurrentLink(pEl.attr('section'));
            this.moveToMore();
            this.loadSection(pEl.attr('section'));  
        },

        relayout: function() {
            this.setContentDimensions();
            galleryViewEl.update();
        },

        render: function(){

            if(!this.valid()) {
                return;
            }
            var _this = this;
            var propertyId = parseInt(decodeURIComponent(location.pathname.split('properties/')[1]));
            this.listings = new ListingCollection();
            this.listings.fetch({
                data: $.param({
                    homesId: propertyId
                }),
                success: function(response){
                    _this.property = response.models[0];
                    
                    if(_this.property === null) {
                        Navigate.toUrl('/');
                        valid = false;
                    }

                    console.log('Property: ', _this.property);
                    galleryViewEl.setProperty(_this.property);

                    // Reset elements for this property view.
                    _this.moreEl = null;
                    _this.moreContentEl = null;
                    _this.$el.html(JST['src/js/templates/layouts/property.html']({
                        property: _this.property,
                        moreContent: JST['src/js/templates/elements/propertyFloorPlans.html']({
                            floor_plans: _this.property.attributes.floor_plans
                        }),
                        guestCardForm: guestCardFormEl.getHTML(),
                        isSelect: true
                    }));
                    _this.$el.attr("class", "property");
                    $('body').prepend(JST['src/js/templates/elements/videoLightbox.html']);

                    guestCardFormEl.init();
                    searchBarViewEl.renderToHeader();
                    _this.setProfileFooter();
                    galleryViewEl.reset();
                    _this.relayout();

                    // Events
                    _this.setResizeEvent();
                    _this.setTouchEvents();
                    _this.setScrollEvent();
                    _this.setVertArrowEvent();
                }
            });
        },

        /**
         * Set the content height for this page.
         */
        setContentDimensions: function() {
            this.contentHeight = $(window).height() - footerViewEl.getHeight();

            if(navigator.userAgent.match(/iPod|iPhone|iPad/i) &&
                navigator.userAgent.match(/Safari/i) && !(navigator.userAgent.match(/Chrome/i) ||
                navigator.userAgent.match(/CriOS/i))) {
                this.contentHeight -= 30;
            }

            this.$el.children('section').css('height', this.contentHeight +"px");
            this.$el.css('height', this.contentHeight +"px");
        },

        /**
         * Load footer with links that will take the user to additional property information.
         */
        setProfileFooter: function() {
            footerViewEl.render([{
                rel: 'floorplans',
                text: 'Floor Plans &amp; Prices'
            }, {
                rel: 'details',
                text: 'Details'
            }, {
                rel: 'reviews',
                text: 'Reviews'
            }, {
                rel: 'map',
                text: 'Map &amp; Directions'
            }, {
                rel: 'share',
                text: 'Share',
                cls: 'notNav share'
            }, {
                rel: 'availability',
                text: 'Check Availability',
                cls: 'availability'
            }]);

            var _this = this;
            $('footer a').bind(touchEventType, function() {
                if($(this).hasClass('notNav')) {
                    // Share Button
                } else {
                    _this.moveToMore();

                    if($(this).attr('rel') !== 'availability') {
                        _this.loadSection($(this).attr('rel'));
                    }
                }
            });

            footerViewEl.makeSticky();
        },

        /**
         * If the screen is resized, make sure we perform a relayout.
         */
        setResizeEvent: function() {
            var _this = this;
            var resizeTimeout = null;
            $(window).resize(function() {
                if(resizeTimeout !== null) {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = null;
                }

                resizeTimeout = setTimeout(function() {
                    _this.relayout();
                }, 250);
            });
        },

        /**
         * Activate footer link when scrolling down.
         */
        setScrollEvent: function() {
            window.onscroll = function(){
                var scrollTop = $(this).scrollTop() * 1.5;
                var percent = scrollTop/$(window).height();
                
                //Add CSS blur to the gallery as the user scrolls the property up
                $('#gallery').css({
                    "-webkit-filter" : 'blur('+ (percent*10) +'px)',
                    "-moz-filter" : 'blur('+ (percent*10) +'px)',
                    "-MS-filter" : 'blur('+ (percent*10) +'px)',
                    "filter" : 'blur('+ (percent*10) +'px)',
                    "-o-filter" : 'blur('+ (percent*10) +'px)'
                });
            };

            $(window).scroll(function() {
                if(this.linksInactive && $(this).scrollTop() > 50) {
                    footerViewEl.activateCurrentLink();
                    this.linksInactive = !this.linksInactive;
                } else if(!this.linksInactive && $(this).scrollTop() <= 50) {
                    footerViewEl.deactivateAllLinks();
                    this.linksInactive = !this.linksInactive;
                } 
            });
        },

        /**
         * Set touchable item events.
         */
        setTouchEvents: function() {
            var _this = this;

            // Teaser sections.
            $('p.clickable').bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onTeaserSectionClick($(this));
            });

            // Check Availability Button.
            $('#teaser .info div[section="video"]').bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onVideoThumbnailClick();
            });

            // Check Availability Button.
            $('.close_button').bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onCloseVideoButtonClick();
            });

            // Show Video
            $(document.getElementById('video')).bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onCheckAvailabilityClick();
            });
        },

        /**
         * Scroll down the page to the additional content when the down arrow is touched.
         */
        setVertArrowEvent: function() {
            var _this = this;
            var vertArrow = $(document.getElementById('swipeVertArrow'));
            vertArrow.unbind(touchEventType);
            vertArrow.bind(touchEventType, function() {
                _this.moveToMore();
            });
        },

        /**
         * Verify that we are in fact on a valid property details view.
         * Parse the property Id from the url.
         */
        valid: function() {
            var valid = true;
            if(!/^\/properties\/\d+$/i.test(location.pathname)) {
                Navigate.toUrl('/');
                valid = false;
            }
            return valid;
        }
    });
    
    return new propertyView();
});