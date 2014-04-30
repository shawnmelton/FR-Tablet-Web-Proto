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
            var moreArrow = $(document.getElementById('moreInfoArrow'));
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
                }, 500, function(){
                    moreArrow.addClass('back');
                    moreArrow.find('span').html('Back To Profile');
                });
            }
        },

        /**
         * Move down the page to the more section for additional property content.
         */
        moveToTop: function() {
            var moreArrow = $(document.getElementById('moreInfoArrow'));
            $('body').animate({
                scrollTop: '0px'
            }, 500, function(){
                $('#moreContent').scrollTop(0);
                moreArrow.removeClass('back');
                moreArrow.find('span').html('More Info');
            });
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
            //Set tab:  pEl.attr('section')
            this.moveToMore();
            //Load Section:  pEl.attr('section')
        },

        relayout: function() {
            this.setContentDimensions();
            galleryViewEl.update();
        },

        relayoutMoreContent: function(){

        },

        render: function(){

            if(!this.valid()) {
                return;
            }

            document.addEventListener("touchmove", ScrollStart, false);
            document.addEventListener("scroll", ScrollStart, false);

            function ScrollStart(e) {
                if($(e.target).parents('#moreContent').length > 0 && $('#moreContent').scrollTop() > 40) {
                    $('.botShadow').addClass('hidden');
                    $('.topShadow').removeClass('hidden');
                }
                else{
                    $('.botShadow').removeClass('hidden');
                    $('.topShadow').addClass('hidden');
                }
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
                        moreContent: JST['src/js/templates/elements/propertyInfo.html']({
                            floor_plans: _this.property.attributes.floor_plans,
                            property: _this.property,
                            propertyAddress: _this.property.address
                        }),
                        guestCardForm: guestCardFormEl.getHTML(),
                        isSelect: true
                    }));
                    _this.$el.attr("class", "property");
                    _this.$el.prepend(JST['src/js/templates/elements/videoLightbox.html']);

                    guestCardFormEl.init();
                    searchBarViewEl.renderToHeader();
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
            this.contentHeight = $(window).height();
            var moreInfoHeight = this.contentHeight - $('footer').height();

            if(WURFL.form_factor == 'Tablet'){
                console.log('Tablet');
                this.contentHeight -= 20;
                moreInfoHeight -= 20;
            }
            else{
                console.log(WURFL);
            }

            this.$el.height(this.contentHeight);
            this.$el.children('section#teaser').height(this.contentHeight);
            this.$el.children('section#more').height(moreInfoHeight);
            $('#video_lightbox').height($(window).height());
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
         * 
         */
        setScrollEvent: function() {
            var _this = this;
            window.onscroll = function(){
                var moreArrow = $(document.getElementById('moreInfoArrow'));
                var scrollTop = $(this).scrollTop() * 1.5;
                var percent = scrollTop/$(window).height();
                if($(this).scrollTop() >= ($(window).height() * 0.85)){
                    moreArrow.addClass('back');
                    moreArrow.find('span').html('Back To Profile');
                    _this.setBackToTopEvent();
                }
                else{
                    $('#moreContent').scrollTop(0);
                    moreArrow.removeClass('back');
                    moreArrow.find('span').html('More Info');
                    _this.setVertArrowEvent();
                }
                var blurAmount = (percent*10 > 15) ? 15 : percent*10;
                //Add CSS blur to the gallery as the user scrolls the property up
                $('#gallery').css({
                    "-webkit-filter" : 'blur('+ blurAmount +'px)',
                    "-moz-filter" : 'blur('+ blurAmount +'px)',
                    "-MS-filter" : 'blur('+ blurAmount +'px)',
                    "filter" : 'blur('+ blurAmount +'px)',
                    "-o-filter" : 'blur('+ blurAmount +'px)',
                });
            };
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

            $('#video_lightbox').bind(touchEventType, function(e){
                e.preventDefault();
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
            var moreArrow = $(document.getElementById('moreInfoArrow'));
            moreArrow.unbind(touchEventType);
            moreArrow.bind(touchEventType, function(){
                _this.moveToMore();
                moreArrow.unbind(touchEventType);
                _this.setBackToTopEvent();
            });
        },

        /**
         * Scroll down the page to the additional content when the down arrow is touched.
         */
        setBackToTopEvent: function() {
            var _this = this;
            var moreArrow = $(document.getElementById('moreInfoArrow'));
            moreArrow.unbind(touchEventType);
            moreArrow.bind(touchEventType, function() {
                _this.moveToTop();
                moreArrow.unbind(touchEventType);
                _this.setVertArrowEvent();
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