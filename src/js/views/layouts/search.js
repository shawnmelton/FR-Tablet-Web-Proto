define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/navigate', 'tools/data', 'models/listing','collections/listings'],
    function($, Backbone, tmplts, searchBarViewEl, Navigate, Data, ListingModel, ListingCollection){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,
        contentHeight: 0,
        pins: [],
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
        newPageScrollTop: 0,
        cardsPerHalfPage: 0,
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

            $.each(_this.listings.models, function(i, listing){
                var location = new Microsoft.Maps.Location(listing.attributes.lat, listing.attributes.lng);
                var card = $('.basic:nth-child(' + (i+1) + ')');
                var isSelect = card.hasClass('select');
                var inViewPort = (i < _this.cardsPerHalfPage);
                if(inViewPort){
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
                }
                else{
                    pinHTML = "<span class='marker simple'></span>";
                }
                var pinOptions = {width: null, height: null, htmlContent: pinHTML, typeName: "pin"+(i+1)}; 
                var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
                pins.push(pin);
                locs.push(location);
                _this.map.entities.push(pin);
                Microsoft.Maps.Events.removeHandler(pin, 'click');
                Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                    $('.marker').removeClass('active');
                    var propertyIndex = i + 1;
                    var card = (i === 0) ? $('div.basic').first() : $('div.basic:nth-child(' + propertyIndex + ')');
                    var pinMarker = $('.pin' + propertyIndex).find('.marker');

                    pinMarker.addClass('active');
                    _this.showGuestCard(card);
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
                zoom: 16,
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
                _this.mapInitialized = false;
                this.currentListingsPage = 0;
                _this.newPageScrollTop = 0;
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
                    $('.results_placeholder').remove();

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
                    var pageHeight = $(_this.resultsEl).find('.page').last().height();
                    var cardCount = $(_this.resultsEl).find('.page').last().find('.basic').length;
                    var cardRowHeight = $(_this.resultsEl).find('.page').last().find('.first').height();
                    console.log(cardCount, ' Cards, Height: ', cardRowHeight);

                    _this.cardsPerHalfPage = cardCount/2;
                    _this.newPageScrollTop += $(_this.resultsEl).find('.page').last().height();

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
            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroupPlaceholder.html']);
            this.resultsEl.find('.basic').each(function(i){
                console.log('Basic ', i);
                pulsate(this, i);
            });

            function pulsate(card, i){
                $(card).delay(i * 200).fadeOut('slow').fadeIn('slow', function(){
                    console.log('done');
                });
            }

            this.setInfiniteScrolling();
            this.setResizeEvent();
            this.setContentDimensions();
            searchBarViewEl.renderToHeader();
            this.setDeviceMotionEvent();

            $('#searchBar button').text('Search');
        },

        plotMapPoints: function(locations){
            var _this = this;
            var locs = [],
                pins = [],
                pinHTML,
                currentLocation = geocodeResult.results[0].location;

            $.each(_this.listings.models, function(i, listing){
                var location = new Microsoft.Maps.Location(listing.attributes.lat, listing.attributes.lng);
                var card = $('.basic:nth-child(' + (i+1) + ')');
                var isSelect = card.hasClass('select');
                var inViewPort = (i < _this.cardsPerHalfPage);
                if(inViewPort){
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
                }
                else{
                    pinHTML = "<span class='marker simple'></span>";
                }
                var pinOptions = {width: null, height: null, htmlContent: pinHTML, typeName: "pin"+(i+1)}; 
                var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
                pins.push(pin);
                locs.push(location);
                _this.map.entities.push(pin);
                Microsoft.Maps.Events.removeHandler(pin, 'click');
                Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                    $('.marker').removeClass('active');
                    var propertyIndex = i + 1;
                    var card = (i === 0) ? $('div.basic').first() : $('div.basic:nth-child(' + propertyIndex + ')');
                    var pinMarker = $('.pin' + propertyIndex).find('.marker');

                    console.log('Card: ', card);

                    pinMarker.addClass('active');
                    if(pinMarker.hasClass('premier')){
                        console.log('Is Premier');
                    }
                    else if(pinMarker.hasClass('simple')){
                        console.log('Is Simple');
                    }
                    else{
                        console.log('Is Basic');
                    }
                    _this.showGuestCard(card);
                });
            });
            //Map is initialized
            _this.mapInitialized = true;

            //Get bounding box from group of pins
            _this.centerOnPinGroup(locs);
            Microsoft.Maps.Events.addHandler(_this.map, 'mousemove', _this.mapMoving);
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
                this.mapCanvas.css('height', (this.contentHeight - (this.contentHeight*0.01)) + "px");
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
                var isLoading = $(_this.resultsEl).hasClass('loading');
                var distanceScrolled = $(window).scrollTop();
                var scrollHeight = $(this).height();
                var scrollThreshold = _this.newPageScrollTop - (scrollHeight * 2);
                if(!isLoading && distanceScrolled >= scrollThreshold && _this.morePropertiesExist) {
                    // console.log('Load More Results');
                    _this.loadResultsSet();
                }
                else{
                    console.log('Still loading...');
                }

                if(distanceScrolled >= _this.newPageScrollTop/2){
                    console.log('Page Top: ', _this.newPageScrollTop, ', Scroll Height: ', scrollHeight);
                    console.log('Content Top: ', distanceScrolled, ', New Threshold: ', scrollThreshold);
                    console.log('Update Map');
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
                    //Get property index
                    
                    window.lastPropertyIndex = $('.basic > .element > .front').index();
                    window.currentListings = _this.listings;

                    _this.currentListingsPage = null;
                    _this.onPropertyClick(parseInt(homesId));
                }
            });
            $('.basic > .element > .back > .ca_button').bind(touchEventType, function(e) {
                _this.hideGuestCard($(this).parent().parent().parent());
                e.preventDefault();
                return false;
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

        hideGuestCard: function(card){
            card.find('.element').attr('class', 'element noOverflow flip');
            setTimeout(func, 100);
            function func() {
                card.find('.element').addClass('hasTransition');
                card.find('.element').removeClass('flip');
            }
        },

        showGuestCard: function(card){
            $('.marker').removeClass('active');
            if(!card) return;
            $(this).unbind(touchEventType);
            var cardIndex = card.index();
            var pinMarker = $('.pin' + (cardIndex+1)).find('.marker');
            pinMarker.addClass('active');
            
            var _this = this;
            var propertyId = card.find('.element').attr('property');
            var listTop = $(window).scrollTop();
            var cardPosition = card.find('.contact').offset();
            if(!cardPosition){
                console.log('Show loader');
                console.log('Load next page, and on load, scroll to that card');
            }

            var cardTop = cardPosition.top;
            var scrollAdjustment = 70;

            $('.basic').find('.element').not($(card)).attr('class', 'element noOverflow hasTransition');
            
            $(card).find('.element').bind('webkitTransitionEnd', function(e){
                $(this).unbind('webkitTransitionEnd');
                var cardOffset = $(card).offset();
                $(this).addClass('flipped noTransition');
                $(this).removeClass('hasTransition');
            });
            $(card).find('.element').addClass('flip');

            $('html, body').scrollTop($(card).offset().top - scrollAdjustment);
        },

        showMoreInfoPanel: function(card){
            var propertyId = card.find('.element').attr('property');
            var cardOffset = $(card).offset();
            var scrollAdjustment = 70;

            $('.basic').find('.element').not($(card)).attr('class', 'element noOverflow hasTransition');
            $('html, body').scrollTop($(card).offset().top - scrollAdjustment);

            //Load More Details template with property information
            this.moreInfoPanel = $(JST['src/js/templates/elements/moreInfoPanel.html']({
                propertyId: propertyId
            }));
            this.moreInfoPanel.height(0);

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
                this.lastPropertyId = propertyId;
            });
        },

        showPropertyDetails: function(card){
            var _this = this;
            var propertyId = card.find('.element').attr('property');

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
                this.moreInfoPanel.height(0).remove();
                _this.showMoreInfoPanel(card);
                _this.showGuestCard(card);
            }
            else{
                _this.showMoreInfoPanel(card);
                _this.showGuestCard(card);
            }
    }
    });
    
    return new searchView();
});