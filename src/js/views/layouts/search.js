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
                search.geocode({where:zip, count:10, callback:geocodeCallback});
                function geocodeCallback(geocodeResult, userData)
                {
                    var locs = [],
                        pins = [],
                        pinHTML,
                        currentLocation = geocodeResult.results[0].location;

                    $.each(listings.models, function(i, listing){
                        var location = new Microsoft.Maps.Location(listing.attributes.lat, listing.attributes.lng);
                        if(i%5 === 0){
                                pinHTML = JST['src/js/templates/elements/pmarker.html']({
                                image_src: listing.attributes.primaryImage,
                                count: '5'
                            });
                        }
                        else{
                                pinHTML = JST['src/js/templates/elements/marker.html']({
                                    count: '1'
                                });
                        }
                        var pinOptions = {width: null, height: null, htmlContent: pinHTML}; 
                        var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
                        Microsoft.Maps.Events.addHandler(pin, 'click', function(e){
                            var propertyIndex = pins.indexOf(e.target);
                            console.log('Clicked ', propertyIndex, _this.listings.models[propertyIndex].attributes);
                            //Bring this card to top of list, n-th child, scroll up
                            //Show info card
                        });
                        _this.map.entities.push(pin);
                        pins.push(pin);
                        locs.push(location);
                    });
                    //Map is initialized
                    _this.mapInitialized = true;

                    //Get bounding box from group of pins
                    _this.centerOnPinGroup(locs);
                }
             } 
            });
        },

        isNumeric: function(n){
          return !isNaN(parseFloat(n)) && isFinite(n);
        },

        loadResultsSet: function() {
            var _this = this;


            //Initialize to zero or increment based on whether
            //or not this is the first call of a new zip code
            if(_this.lastSearchString != _this.searchString || this.currentListingsPage === null){
                _this.mapInitialized = false;
                this.currentListingsPage = 0;
            }
            else{
                this.currentListingsPage++;
            }

            console.log('Load Results', _this.lastSearchString, _this.searchString);
            console.log('Load page: ', _this.currentListingsPage);

            //Show loading image
            $(_this.resultsEl).addClass('loading');

            var searchOptions = {
                limit: _this.listingLimit,
                start: _this.currentListingsPage*_this.listingLimit
            };

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

                    console.log('Count: ', _this.listings.totalRecs);
                    console.log('Response: ', response);
                    console.log('Load page: ', _this.currentListingsPage);

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

        /**
         * Handle what happens when a property is touched/clicked.
         * @propertyId - Integer value.
         */
        onPropertyClick: function(homesId) {
            Navigate.toUrl('/properties/'+homesId);
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

        /**
         * Set the infinite scrolling so that results continue to load as the user swipes
         * down the screen.
         */
        setInfiniteScrolling: function() {
            var _this = this;
            $(this.el).scroll(function(){
                var distanceScrolled = $(this).scrollTop();
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
            $('.basic > .element').bind(touchEventType, function() {
                // $(this).find('div.element').toggleClass('flip');
                // $('.basic div').not($(this)).removeClass('flip');

                var homesId = $(this).attr('property');
                if(homesId !== 'undefined' && homesId !== false) {
                    _this.currentListingsPage = null;
                    _this.onPropertyClick(parseInt(homesId));
                }
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
        }
    });
    
    return new searchView();
});