define(['jquery', 'backbone', 'templates/jst', 'views/elements/propertyView', 'views/elements/searchBar', 'views/elements/footer',
    'tools/navigate', 'tools/data', 'views/elements/propertyGallery','models/listing','collections/listings'],
    function($, Backbone, tmplts, propertyViewEl, searchBarViewEl, footerViewEl, Navigate, Data, galleryViewEl, ListingModel, ListingCollection){
    var propertyView = Backbone.View.extend({
        el: "#content",
        video: null,
        map: null,
        property: null,
        moreEl: null,
        moreContentEl: null,
        contentHeight: 0,
        linksInactive: true,
        listings: null,
        mapInitialized: false,

        initProperty: function(property){
            var _this = this;
            if(property === null) {
                Navigate.toUrl('/');
                valid = false;
            }

            $('[name="keywords"]').val(property.attributes.city);
            $('#searchBar button').text('Back');

            galleryViewEl.setProperty(property);
            var hasVideo = (typeof property.attributes.video !== 'undefined');
            _this.$el.html(propertyViewEl.getHTML(property));

            _this.video = document.getElementById('video');
            _this.$el.attr("class", "property");
            _this.$el.prepend(JST['src/js/templates/elements/photoLightbox.html']);
            
            searchBarViewEl.renderToHeader();                    
            galleryViewEl.reset();
            _this.relayout();

            // Events
            _this.setResizeEvent();
            _this.setTouchEvents();
            _this.setScrollEvent();
            _this.setVertArrowEvent();

            //Get more listings
            _this.loadNearbyListings();
            _this.initializePropertyMap();
        },

        initializePropertyMap: function(){
            var _this = this;
            var location = new Microsoft.Maps.Location(this.property.attributes.lat, this.property.attributes.lng);
            if(!location) return false;
            var mapOptions = {
                credentials:"AlnGUafJim9K7OtP3Ximx2ZgbtPPLJ954ctxyPBDVZs_iBiBfF57NBrP4Y3aM2tW",
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: 12,
                showScalebar: false,
                showDashboard: false,
                center: location
            };
            var propertyMap = document.getElementById("property-map");
            if(!propertyMap) return false;
            this.map = new Microsoft.Maps.Map(propertyMap, mapOptions);
            var pinHTML = JST['src/js/templates/elements/pmarker.html']({
                image_src: _this.property.attributes.primaryImage,
                count: '1'
            });
            var pinOptions = {width: null, height: null, htmlContent: pinHTML, typeName: "pin1 property"}; 
            var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
            this.map.entities.push(pin);
            this.map.setView({ center: location });
            this.mapInitialized = this.map;
        },

        loadNearbyListings: function(searchString) {
            var _this = this,
                searchOptions = {
                    limit: 10,
                    start: 0,
                    city: _this.property.attributes.city
                };
            this.listings = new ListingCollection();
            this.listings.fetch({
                data: $.param(searchOptions),
                success: function(response){
                    _this.populateMap(_this.listings);
                }
            });
        },

        /**
         * Move down the page to the more section for additional property content.
         */
        moveToMore: function(section) {
            var sectionEl = $('#' + section);
            var moreElTopPos = (sectionEl.position().top + $('#content').height()) - $('footer').height();

            console.log(section, ' top: ', sectionEl.position().top);

            // Don't scroll to the More section unless the user isn't close.
            if($('body').scrollTop() < (moreElTopPos - 50)) {
                console.log("Body");
                $('body').animate({
                    scrollTop: moreElTopPos +'px'
                }, 500);
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

        populateMap: function(listings){
            var _this = this,
                locs = [],
                pins = [];
            $.each(listings.models, function(i, listing){
                if(listing.attributes.streetAddress != _this.property.attributes.streetAddress){
                    var location = new Microsoft.Maps.Location(listing.attributes.lat, listing.attributes.lng),
                        pinHTML = "<span class='marker simple'></span>",
                        pinOptions = {width: null, height: null, htmlContent: pinHTML, typeName: "pin"+(i+1)},
                        pin = new Microsoft.Maps.Pushpin(location, pinOptions);

                    pins.push(pin);
                    locs.push(location);

                    if(!_this.mapInitialized) return false;

                    _this.map.entities.push(pin);
                    var bounds = new Microsoft.Maps.LocationRect.fromLocations(locs);

                    Microsoft.Maps.Events.removeHandler(pin, 'click');
                    Microsoft.Maps.Events.addHandler(pin, 'click', function(e){

                        Microsoft.Maps.Events.removeHandler(pin, 'click');
                        Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                            _this.preload(listing.attributes.homesId, function(){
                                Navigate.toUrl('/properties/'+listing.attributes.homesId);
                            });
                        });

                        var newPinHTML = JST['src/js/templates/elements/large_marker.html']({
                            image_src: listing.attributes.primaryImage,
                            property: listing.attributes
                        });

                        $('.marker.large').parent().not('.property').html("<span class='marker simple'></span>");

                        var propertyIndex = i + 1;
                        var pinMarker = $('.pin' + propertyIndex + ' > .marker');
                        pinMarker.parent().html(newPinHTML);
                        pinMarker.addClass('active');
                    });
                }
            });
        },

        /**
         * Handle what happens when the user clicks on the Check Availability button in the
         * property teaser.
         */
        onCheckAvailabilityClick: function() {
            this.moveToMore('details');
        },

        onCloseVideoButtonClick: function(){
            $('video')[0].pause();
            $('#video_lightbox').removeClass('show');
            $('body').unbind('mousewheel');
        },

        /**
         * Show video lightbox and load video
         */
        onVideoThumbnailClick: function() {
            $('#video_lightbox').addClass('show');
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
            this.moveToMore(pEl.attr('section'));
            //Load Section:  pEl.attr('section')
        },

        relayout: function() {
            this.setContentDimensions();
            galleryViewEl.update();
        },

        render: function(){
            $('#map-container').hide();
            $('#map-canvas').removeClass('showMap');
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
                    _this.initProperty(_this.property);
                }
            });
        },

        preload: function(propertyId, done){
            //Stub in preloader
            this.$el.html(JST['src/js/templates/layouts/propertyPlaceholder.html']);
            var newListing = new ListingCollection();
            newListing.fetch({
                data: $.param({
                    homesId: propertyId
                }),
                success: function(response){
                    //Run callback
                    if(typeof(done) == "function"){
                        console.log('Call Callback');
                        done();
                    }
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

            if(window.orientation == 90 || window.orientation == -90){
                console.log('Landscape: ', this.contentHeight);
                $('.photo_container img').removeClass('relativeCenter');
                $('.photo_container img').removeClass('width100');
                $('.photo_container img').addClass('height100');
            }
            else{
                console.log('Portrait: ', this.contentHeight);
                $('.photo_container img').addClass('width100');
                $('.photo_container img').removeClass('height100');
                $('.photo_container img').removeClass('relativeCenter');
            }

            this.$el.height(this.contentHeight);
            this.$el.children('section#more').height(moreInfoHeight);
            this.$el.children('section#more').css('top', $(window).height());
            $('#video_lightbox').height($(window).height());
            $('.photo_container').width($(window).width());
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
                console.log('Scolling...');

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

            $('video').bind('touchmove', function(e){
                console.log('Touch Move');
                if($('#video_lightbox.show').length){
                    e.preventDefault();
                    return false;
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
            $('#videoPlayButton').bind(touchEventType, function(ev) {
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

            $('#video_lightbox, #video').bind('touchmove', function(e){
                e.preventDefault();
                return false;
            });

            $('#floorplans tr').bind(touchEventType, function(ev){
                var details = $(this).next().find('.moreDetails');
                var label = $(this).find('.moreDetailsButton');
                if(details.hasClass('show')){
                    details.removeClass('show');
                    $('.moreDetailsButton').text('more details here');
                }
                else{
                    $('.moreDetails').removeClass('show');
                    $('.moreDetailsButton').text('more details here');
                    details.addClass('show');
                    label.text('close');
                }
            });


            $('#sendToCellButton').bind(touchEventType, function(ev){
                $(this).removeClass('show');
                if(isMobileDevice){
                    $('body').animate({
                        scrollTop: '0px'
                    }, 500);
                }
            });

            $('#buttonCA').bind(touchEventType, function(ev){
                $('.lightbox').addClass('show');
                $('.lightbox').bind(touchEventType, function(ev){
                    if($(ev.target).hasClass('lightbox') || $(ev.target).hasClass('sendToCellButton')){
                        $(this).removeClass('show');
                        if(isMobileDevice){
                            $('body').animate({
                                scrollTop: '0px'
                            }, 500);
                        }
                    }
                });
            });

            $('.galleryPhotos>img').click(function(){
                galleryViewEl.openImageInLightbox($(this).index());
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
                _this.moveToMore('details');
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