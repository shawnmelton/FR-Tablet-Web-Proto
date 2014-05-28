define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'views/elements/footer',
    'tools/navigate', 'tools/data', 'views/elements/propertyGallery', 'views/elements/guestCardForm','models/listing','collections/listings'],
    function($, Backbone, tmplts, searchBarViewEl, footerViewEl, Navigate, Data, galleryViewEl, guestCardFormEl, ListingModel, ListingCollection){
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
            
            console.log('Can getz map Element!');

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

        loadResultsSet: function(searchString) {
            var _this = this,
                locs = [],
                pins = [];

            var searchOptions = {
                limit: 10,
                start: 0,
                city: _this.property.attributes.city
            };

            this.listings = new ListingCollection();
            this.listings.fetch({
                data: $.param(searchOptions),
                success: function(response){
                    console.log('Got more listings: ', _this.listings);
                    $.each(_this.listings.models, function(i, listing){
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

                            //CENTER MAP ON THIS PROPERTY
                            // _this.map.setView({ center: location });
                            // console.log('Property ', i);
                            // if(i+1 == _this.listings.length){
                            //     //Set map bounds
                            //     _this.map.setView({
                            //         bounds: bounds
                            //     });
                            // }

                            // Microsoft.Maps.Events.addHandler(_this.map, 'mousemove', function(e){
                            //     //Set map bounds
                            //     _this.map.setView({
                            //         bounds: bounds
                            //     });
                            //     e.preventDefault();
                            //     return false;
                            // });

                            Microsoft.Maps.Events.removeHandler(pin, 'click');
                            Microsoft.Maps.Events.addHandler(pin, 'click', function(e){

                                Microsoft.Maps.Events.removeHandler(pin, 'click');
                                Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                                    _this.preload(listing.attributes.homesId, function(){
                                        console.log('Go to URL');
                                        Navigate.toUrl('/properties/'+listing.attributes.homesId);
                                    });
                                });

                                var newPinHTML = JST['src/js/templates/elements/large_marker.html']({
                                    image_src: listing.attributes.primaryImage,
                                    property: listing.attributes
                                });

                                console.log('Property Info ', listing);

                                $('.marker.large').parent().not('.property').html("<span class='marker simple'></span>");

                                var propertyIndex = i + 1;
                                var pinMarker = $('.pin' + propertyIndex + ' > .marker');
                                pinMarker.parent().html(newPinHTML);
                                pinMarker.addClass('active');
                            });
                        }
                    });
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
            console.log('Set Content Dimensions');
            this.setContentDimensions();
            galleryViewEl.update();
        },

        relayoutMoreContent: function(){

        },

        render: function(){

            $('#map-container').hide();
            $('#map-canvas').removeClass('showMap');
            
            if(!this.valid()) {
                return;
            }

            console.log('Property Index: ', window.lastPropertyIndex);
            console.log('Properties: ', window.currentListings);

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
                    guestCardFormEl.init(_this.property);
                                        
                    if(_this.property === null) {
                        Navigate.toUrl('/');
                        valid = false;
                    }

                    galleryViewEl.setProperty(_this.property);
                    var hasVideo = (typeof _this.property.attributes.video !== 'undefined');

                    // Reset elements for this property view.
                    _this.moreEl = null;
                    _this.moreContentEl = null;
                    _this.$el.html(JST['src/js/templates/layouts/property.html']({
                        property: _this.property,
                        moreContent: JST['src/js/templates/elements/propertyInfo.html']({
                            floor_plans: _this.property.attributes.floor_plans,
                            property: _this.property,
                            propertyAddress: _this.property.streetAddress
                        }),
                        detailsSection: '',
                        floorplansSection: '',
                        reviewsSection:'',
                        mapSection:'',
                        guestCardForm: guestCardFormEl.getHTML(),
                        communitySpotlight: (hasVideo) ? JST['src/js/templates/elements/communitySpotlight.html']({
                            video_source: _this.property.attributes.video
                        }) : '',
                        propertyGallery: JST['src/js/templates/elements/propertyGallery.html']({
                            images: _this.property.attributes.images
                        }),
                        propertyManagement: JST['src/js/templates/elements/propertyManagement.html']({
                            management_info: ''
                        }),
                        officeHours: '',
                        petPolicy: '',
                        isSelect: true
                    }));

                    _this.$el.attr("class", "property");
                    if(hasVideo){
                        _this.$el.prepend(JST['src/js/templates/elements/videoLightbox.html']({
                            source: _this.property.attributes.video
                        }));

                        _this.video = document.getElementById('video');
                        console.log('Has Video: ', _this.video);
                    }
                    _this.$el.prepend(JST['src/js/templates/elements/photoLightbox.html']);

                    _this.$el.prepend($('<div class="lightbox"></div>'));
                    $('.lightbox').prepend(JST['src/js/templates/elements/sendToCellForm.html']);
                    
                    searchBarViewEl.renderToHeader();                    
                    galleryViewEl.reset();
                    _this.relayout();


                    // Events
                    _this.setResizeEvent();
                    _this.setTouchEvents();
                    _this.setScrollEvent();
                    _this.setVertArrowEvent();

                    //Get more listings
                    _this.loadResultsSet();
                    _this.initializePropertyMap();

                    $('[name="keywords"]').val(_this.property.attributes.city);
                    $('#searchBar button').text('Back');
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
                    var thisProperty = response.models[0];
                    
                    if(thisProperty === null) {
                        return false;
                    }

                    var hasVideo = (typeof thisProperty.attributes.video !== 'undefined');
                    var pageContent = JST['src/js/templates/layouts/property.html']({
                        property: thisProperty,
                        moreContent: JST['src/js/templates/elements/propertyInfo.html']({
                            floor_plans: thisProperty.attributes.floor_plans,
                            property: thisProperty,
                            propertyAddress: thisProperty.address
                        }),
                        detailsSection: '',
                        floorplansSection: '',
                        reviewsSection:'',
                        mapSection:'',
                        guestCardForm: guestCardFormEl.getHTML(),
                        communitySpotlight: (hasVideo) ? JST['src/js/templates/elements/communitySpotlight.html']({
                            video_source: thisProperty.attributes.video
                        }) : '',
                        propertyGallery: JST['src/js/templates/elements/propertyGallery.html']({
                            images: thisProperty.attributes.images
                        }),
                        propertyManagement: JST['src/js/templates/elements/propertyManagement.html']({
                            management_info: ''
                        }),
                        officeHours: '',
                        petPolicy: '',
                        isSelect: true
                    });

                    //Run callback
                    if(typeof(done) == "function"){
                        console.log('Call Callback');
                        done();
                    }
                }
            });
        },

        retrieveProperty: function(homesId){
            // Check browser support
            if (typeof(Storage) != "undefined")
            {
                // Retrieve
                var property = localStorage.getItem(homesId);
                console.log('Property: ', property);
            }
            else
            {
                console.log("Sorry, your browser does not support Web Storage...");
            }
        },

        saveProperty: function(property){
            // Check browser support
            if (typeof(Storage) != "undefined")
            {
                // Store
                localStorage.setItem(property.attributes.homesId, property);
            }
            else
            {
                console.log("Sorry, your browser does not support Web Storage...");
            }
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
                console.log($(this).index());
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