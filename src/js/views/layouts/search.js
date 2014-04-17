define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/navigate', 'tools/data', 'models/listing','collections/listings'],
    function($, Backbone, tmplts, searchBarViewEl, Navigate, Data, ListingModel, ListingCollection){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,
        contentHeight: 0,
        map: null,
        mapCanvas: $('#map-canvas'),
        mapInitialized: false,
        userAddressTerms: null,
        propertyIndex: null,
        searchString: null,
        lastSearchString: null,
        userZip: null,
        lastZip: null,
        userState: null,
        userCity: null,
        currentListingsPage: null,
        currentSearchListingCount: 0, //How many recs have been loaded, to compare to total
        listingLimit: 20,
        scrollTriggerDistance: 600,
        morePropertiesExist: false,
        moreInfoPanel: null,
        lastPropertyId: null,

        /**
         * Locate a property given an id.
         */
        findById: function(id) {

            var obj = null;
            this.listings.each(function(property) {
                if(parseInt(property.get('id')) === id) {
                    obj = property.toJSON();
                }
            });

            return obj;
        },

        getLocationFromZip: function(address){
            //
        },

        geocodeCallback: function(geocodeResult, userData){
            var _this = this;
            var locs = [],
                pins = [],
                pinHTML,
                currentLocation = geocodeResult.results[0].location;
                    
            console.log('New Location: ', currentLocation);

            $.each(_this.listings.models, function(i, listing){
                var location = new Microsoft.Maps.Location(listing.attributes.lat, listing.attributes.lng);
                var card = $('.basic:nth-child(' + (i+1) + ')');
                var isSelect = card.hasClass('select');
                if(isSelect){
                        pinHTML = JST['src/js/templates/elements/pmarker.html']({
                        image_src: listing.attributes.primaryImage,
                        count: i+1
                    });
                }
                else{
                        pinHTML = JST['src/js/templates/elements/marker.html']({
                            count: i+1
                        });
                }
                var pinOptions = {width: null, height: null, htmlContent: pinHTML}; 
                var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
                pins.push(pin);
                locs.push(location);
                _this.map.entities.push(pin);
                Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                    $('.marker').removeClass('active');
                    var propertyIndex = pins.indexOf(e.target) + 1;
                    var card = $('.basic:nth-child(' + propertyIndex + ')');
                    console.log('Clicked ', card);
                    console.log(this);
                    _this.showGuestCard(card);

                    $(pin).find('.marker').addClass('active');
                });
            });
            //Map is initialized
            _this.mapInitialized = true;

            //Get bounding box from group of pins
            _this.centerOnPinGroup(locs);
            Microsoft.Maps.Events.addHandler(_this.map, 'mousemove', _this.mapMoving);
            // Microsoft.Maps.Events.addHandler(_this.map, 'mouseup', function(e){
            //     _this.mapMoved(e);
            // });


            //ViewChangeEnd
        },

        centerOnPinGroup: function(pins){
            var bounds = new Microsoft.Maps.LocationRect.fromLocations(pins);

            //Set map bounds
            this.map.setView({
                bounds: bounds
            });
        },

        initializeMap: function(listings) {
            /**
             *  TODO: Get Lat/Lng from zip or address and
             *  pass to the mapOptions
             */
            var mapOptions = {
                credentials:"AlnGUafJim9K7OtP3Ximx2ZgbtPPLJ954ctxyPBDVZs_iBiBfF57NBrP4Y3aM2tW",
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: 15,
                showScalebar: false
            };
            this.map = new Microsoft.Maps.Map(document.getElementById("map-canvas"), mapOptions);

            var _this = this;
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: function(){
                var zip = decodeURIComponent(location.pathname.split('search/')[1]);
                var search = new Microsoft.Maps.Search.SearchManager(_this.map);
                search.geocode({where:zip, count:10, callback: function(geocodeResult, userData){
                    _this.geocodeCallback(geocodeResult, userData);
                }});
                
             } 
            });
        },

        isNumeric: function(n){
          return !isNaN(parseFloat(n)) && isFinite(n);
        },

        loadResultsSet: function(searchString) {
            var _this = this;


            //Initialize to zero or increment based on whether
            //or not this is the first call of a new zip code
            if(_this.lastSearchString != _this.searchString || this.currentListingsPage === null){
                $(this.resultsEl).html('');
                _this.mapInitialized = false;
                this.currentListingsPage = 0;
            }
            else{
                this.currentListingsPage++;
            }

            console.log('Load Results', _this.lastSearchString, _this.searchString);
            console.log('Load page: ', _this.currentListingsPage);
            console.log('Use: ', searchString);

            //Show loading image
            $(_this.resultsEl).addClass('loading');

            var searchOptions = {
                limit: _this.listingLimit,
                start: _this.currentListingsPage*_this.listingLimit
            };

            this.searchString = searchString || this.searchString;

            //If search string is numeric, search by zip code
            if(this.isNumeric(this.searchString)){
                searchOptions.zip = this.searchString;
            }
            else{
                searchOptions.city = encodeURI(this.searchString);
            }

            this.listings = new ListingCollection();
            this.listings.fetch({
                data: $.param(searchOptions),
                success: function(response){
                    //Remove loading image
                    $(_this.resultsEl).removeClass('loading');

                    var numListings = response.length;
                    _this.morePropertiesExist = (response.length);
                    if(!_this.morePropertiesExist){
                        //Remove loading class
                        return;
                    }

                    //Properties exist

                    //Increment listings shown
                    _this.currentSearchListingCount += numListings;

                    //Update current searched zip
                    _this.lastSearchString = _this.searchString;

                    var blocks = 4;

                    $('.table > div > div > div').unbind(touchEventType);
                    _this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroup.html']({
                        startIndex: this.propertyIndex,
                        selects: (numListings >= blocks) ? _this.listings.slice(0,blocks) : _this.listings.slice(0,numListings),
                        properties: (numListings > blocks) ? _this.listings.slice(blocks,numListings-blocks) : null,
                        listings: _this.listings,
                        numBlocksToPrint: blocks,          //Change this based or layout options
                        numPropertiesToPrint: blocks       //Change this based or layout options
                    }));

                    _this.setPropertyClickEvents();

                    //Initialize map with listings and 
                    //center on the group
                    if(!_this.mapInitialized){
                        _this.initializeMap(_this.listings);
                    }
                }
            });
        },

        /**
         *  Hanldle click on Current Location button
         *
         */
        currentLocationClicked: function(){
            this.setUserLocation();
        },

        mapMoved: function(e){
            var _this = this;
            var map = this.map;
            var point = new Microsoft.Maps.Point(e.getX(), e.getY());
            var loc = e.target.tryPixelToLocation(point);
            var coords = loc.latitude + ", " + loc.longitude;
            console.log('Map Moved ', coords);

            $.ajax({
                url: "http://dev.virtualearth.net/REST/v1/Locations/" + coords,
                dataType: "jsonp",
                data: {
                    key: "AlnGUafJim9K7OtP3Ximx2ZgbtPPLJ954ctxyPBDVZs_iBiBfF57NBrP4Y3aM2tW"
                },
                jsonp: "jsonp",
                success: function (data) {
                    var result = data.resourceSets[0];
                    if (result && result.resources[0]) {
                        var searchString = result.resources[0].address.locality;
                        _this.mapInitialized = false;
                        _this.currentListingsPage = null;
                        _this.lastSearchString = null;
                        _this.loadResultsSet(searchString);
                    }
                }
            });
        },

        mapMoving: function(e){

        },

        /**
         * Handle what happens when a property is touched/clicked.
         * @propertyId - Integer value.
         */
        onPropertyClick: function(homesId) {
            Navigate.toUrl('/properties/'+homesId);
        },

        reInitializeMap: function(zip){
            var _this = this;
            console.log('Reinitialize: ', zip);
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: function(){
                var search = new Microsoft.Maps.Search.SearchManager(_this.map);
                search.geocode({where:zip, count:10, callback: function(geocodeResult, userData){
                    _this.geocodeCallback(geocodeResult, userData);
                }});
                
             } 
            });
        },

        /**
         * Render the search results view.
         * Load the first 10 results.
         */
        render: function(){
            var _this = this;
            this.searchString = decodeURIComponent(location.pathname.split('search/')[1]);
            this.loadResultsSet();
            this.setKeywords();
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");

            //Check for "Show Map" setting
            this.$el.addClass('showMap');
            this.mapCanvas.addClass('showMap');

            //Toggle browse/split-map view
            $('#currentLocationButton').click(function(){
                _this.currentLocationClicked();
            });

            //Check for orientation
            window.addEventListener("orientationchange", function() {
                this.setContentDimensions();
            }, false);

            this.resultsEl = $(document.getElementById('results'));
            this.setInfiniteScrolling();
            this.setResizeEvent();
            this.setContentDimensions();
            searchBarViewEl.renderToHeader();
            this.setDeviceMotionEvent();
        },

        /**
         * Set the content height for this page.
         */
        setContentDimensions: function() {
            this.contentHeight = $(window).height();

            if (navigator.userAgent.match(/iPod|iPhone|iPad/i) &&
                navigator.userAgent.match(/Safari/i) && !(navigator.userAgent.match(/Chrome/i) ||
                    navigator.userAgent.match(/CriOS/i))) {
                this.contentHeight -= 30;
            }

            if($(window).width() <= 768 || window.orientation === 0 || window.orientation === 180){
                this.$el.addClass('portrait');
                this.mapCanvas.addClass('portrait');

                //If Portrait, the height is set by percentage,
                //so we need to clear out the inline css text
                this.$el.css('cssText', '');
                this.mapCanvas.css('cssText', '');
            }
            else{
                this.$el.removeClass('portrait');
                this.mapCanvas.removeClass('portrait');

                //If Landscape, set height by window height
                this.mapCanvas.css('height', (this.contentHeight - 45) + "px");
                this.$el.css('height', this.contentHeight + "px");
            }
        },

        setDeviceMotionEvent: function(){
            window.addEventListener('devicemotion', function(event) {
                var x = event.acceleration.x;
                var y = event.acceleration.y;
                var z = event.acceleration.z;

                var ralpha = event.rotationRate.alpha;
                var rbeta = event.rotationRate.beta;
                var rgamma = event.rotationRate.gamma;

                var interval = event.interval;

                if(Math.abs(rgamma) > 60){
                    console.log('Tilt: ', rgamma);

            $('.basic div').find('.element').removeClass('flipped');
            $('.basic div').find('.element').removeClass('noTransition');
            $('.basic div').find('.element').addClass('hasTransition');
            $('.basic div').find('.element').removeClass('flip');
                    
                }
            });
        },

        /**
         * Set the infinite scrolling so that results continue to load as the user swipes
         * down the screen.
         */
        setInfiniteScrolling: function() {
            var _this = this;
            $(window).scroll(function(){
                var distanceScrolled = $(window).scrollTop();
                var scrollHeight = $(this).height();
                var scrollThreshold = scrollHeight * _this.currentListingsPage + scrollHeight;
                // console.log('Content Top: ', distanceScrolled, ', New Threshold: ', scrollThreshold);
                if(distanceScrolled >= scrollThreshold && _this.morePropertiesExist) {
                    // console.log('Load More Results');
                    _this.loadResultsSet();
                }
            });
        },

        /**
         * Get the keywords based on the url.
         * First make sure user did a proper search.
         */
        setKeywords: function() {
            if(!/^\/search\/[a-z,A-Z,0-9, ,\,,\',\-,\%,\&,\;]+$/i.test(location.pathname)) {
                Navigate.toUrl('/');          
            }

            searchBarViewEl.setKeywords(decodeURIComponent(location.pathname.split('search/')[1]));
        },

        setMotionDetection: function(){
            window.ondevicemotion = function(event) {

            };
        },

        /**
         * Make each property touchable.
         */
        setPropertyClickEvents: function() {
        var _this = this;
            $('.basic > .element > .front').bind(touchEventType, function() {
                var homesId = $(this).parent().attr('property');
                if(homesId !== 'undefined' && homesId !== false) {
                    _this.currentListingsPage = null;
                    _this.onPropertyClick(parseInt(homesId));
                }
            });
            $('.basic > .element > .contact').bind(touchEventType, function(e) {
                _this.showGuestCard($(this).parent().parent());
                e.preventDefault();
                return false;
            });
            $('.basic > .element > .details').bind(touchEventType, function(e) {
                _this.showPropertyDetails($(this).parent().parent());
                e.preventDefault();
                return false;
            });
        },

        /**
         * If the screen is resized, make sure we perform a relayout.
         */
        setResizeEvent: function() {
            var _this = this;
            var resizeTimeout = null;
            $(window).resize(function() {
                if (resizeTimeout !== null) {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = null;
                }

                resizeTimeout = setTimeout(function() {
                    _this.setContentDimensions();
                }, 250);
            });
        },

        setUserLocation: function(){
            console.log('Show Loader');
            var _this = this;
            //First, check for geolocation capability
            if (navigator.geolocation) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log('Hide Loader ', position);
                }, function() {
                    console.log('No Location Allowed/Found');
                });
            }
            // Browser doesn't support Geolocation
            else {
                console.log('Browser Doesn\'t Support Geolocation');
            }
        },

        showGuestCard: function(card){
            if(!card) return;
            $(this).unbind(touchEventType);

            var _this = this;
            var propertyId = card.find('.element').attr('property');
            var listTop = $(window).scrollTop();
            var cardPosition = card.find('.contact').offset();
            var cardTop = cardPosition.top;
            var scrollAdjustment = 70;

            $('.basic div').not($(card).find('.element')).attr('class','element noOverflow hasTransition');

            $('html, body').animate({
                scrollTop: ($(card).offset().top - scrollAdjustment)
            }, function(){
                $(card).find('.element').bind('webkitTransitionEnd', function(e){
                    $(this).unbind('webkitTransitionEnd');
                    var cardOffset = $(card).offset();
                    $(this).addClass('flipped noTransition');
                    $(this).removeClass('hasTransition');
                });

                //flip card
                $(card).find('.element').addClass('flip');
                
                // Hide/Remove existing moreInfoPanel
                if(_this.moreInfoPanel){
                    _this.moreInfoPanel.animate({
                        height: 0
                    }, function(){
                        _this.moreInfoPanel.remove();
                        _this.moreInfoPanel = null;
                    });
                }
            });
        },

        showMoreInfoPanel: function(card){
            var propertyId = card.find('.element').attr('property');
            var cardOffset = $(card).offset();
            //Load More Details template with property information
            this.moreInfoPanel = $(JST['src/js/templates/elements/moreInfoPanel.html']({
                propertyId: propertyId
            }));

            // this.moreInfoPanel.height(0);

            if($(card).hasClass('select')){
                $(card).after(this.moreInfoPanel);
            }
            else if(cardOffset.left < $(card).width()){
                $(card).next().after(this.moreInfoPanel);
            }
            else{
                $(card).after(this.moreInfoPanel);
            }

            this.moreInfoPanel.animate({
                height: $(card).height()
            }, function(){
                $('.basic div').removeClass('flip');
                this.lastPropertyId = propertyId;
            });
        },

        showPropertyDetails: function(card){
            var _this = this;
            var propertyId = card.find('.element').attr('property');
            var listTop = $(this.el).scrollTop();
            var cardPosition = card.find('.details').offset();
            var cardTop = cardPosition.top;
            var cardOffset = $(card).offset();
            var scrollAdjustment = 70;
            var cardHeight = $(card).height();

            if(_this.moreInfoPanel && _this.lastPropertyId == propertyId){
                // Hide/Remove existing moreInfoPanel
                _this.moreInfoPanel.animate({
                    height: 0
                }, function(){
                    _this.moreInfoPanel.remove();
                    _this.moreInfoPanel = null;
                });
                return;
            }

            //Hide/Remove existing moreInfoPanel
            if(this.moreInfoPanel){
                this.moreInfoPanel.animate({
                    height: 0
                }, function(){
                    //Clear out and remove old panel
                    _this.moreInfoPanel.remove();
                    _this.moreInfoPanel = null;
                    _this.showMoreInfoPanel(card);
                });
            }
            else{
                _this.showMoreInfoPanel(card);
            }
    }
    });
    
    return new searchView();
});