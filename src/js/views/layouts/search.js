define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/navigate', 'tools/data'],
    function($, Backbone, tmplts, searchBarViewEl, Navigate, Data){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,
        contentHeight: 0,
        map: null,
        userAddressTerms: null,

        getLocationFromZip: function(address){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({address: address },
                function(results_array, status) { 
                    // Check status and do whatever you want with what you get back
                    // in the results_array variable if it is OK.
                    var lat = results_array[0].geometry.location.lat();
                    var lng = results_array[0].geometry.location.lng();
                    var userLocation = new google.maps.LatLng(lat, lng);

                    return userLocation;
            });
        },

        initializeMap: function() {
            var map = new Microsoft.Maps.Map(document.getElementById("map-canvas"), {credentials:"AlnGUafJim9K7OtP3Ximx2ZgbtPPLJ954ctxyPBDVZs_iBiBfF57NBrP4Y3aM2tW"});         
        },

        loadResultsSet: function() {
            $('.table > div > div > div').unbind(touchEventType);

            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroup.html']({
                selects: Data.get('select', 2),
                properties: Data.get('basic', 17)
            }));

            this.setPropertyClickEvents();
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
        onPropertyClick: function(propertyId) {
            Navigate.toUrl('/properties/'+propertyId);
        },

        /**
         * Render the search results view.
         * Load the first 10 results.
         */
        render: function(){
            var _this = this;

            this.initializeMap();

            this.setKeywords();
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");

            $('#currentLocationButton').click(function(){
                _this.currentLocationClicked();
            });

            this.resultsEl = $(document.getElementById('results'));
            this.loadResultsSet();
            this.setInfiniteScrolling();
            this.setResizeEvent();
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

            $('#map-canvas').css('height', this.contentHeight + "px");
            this.$el.css('height', this.contentHeight + "px");            
            map.LoadMap();
        },

        /**
         * Set the infinite scrolling so that results continue to load as the user swipes
         * down the screen.
         */
        setInfiniteScrolling: function() {
            _this = this;
            $(window).scroll(function(){
                if($(window).scrollTop() >= ($(document).height() - $(window).height() - 600)) {
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

        /**
         * Set the user's LatLong location to a certain point on the 
         * screen other than the center
         */
        setMapOffset: function(latlng,offsetx,offsety){
            var point1 = map.getProjection().fromLatLngToPoint(
                (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
            );
            var point2 = new google.maps.Point(
                ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
                ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
            );  
            map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
                point1.x - point2.x,
                point1.y + point2.y
            )));
        },

        /**
         * Make each property touchable.
         */
        setPropertyClickEvents: function() {
            var _this = this;
            $('.table > div > div > div').bind(touchEventType, function() {
                var propertyId = $(this).attr('property');
                if(propertyId !== 'undefined' && propertyId !== false) {
                    _this.onPropertyClick(parseInt(propertyId));
                }
            });
        },

        /**
         * If the screen is resized, make sure we perform a relayout.
         */
        setResizeEvent: function() {
            console.log("Resize");
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
            if (navigator.geolocation && map) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function(position) {
                    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(initialLocation);
                    _this.setMapOffset(initialLocation, $(window).width() * 0.25, 0);
                    console.log('Hide Loader');
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