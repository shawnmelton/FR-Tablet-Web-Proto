define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var fullMapViewEl = Backbone.View.extend({
        property: null,
        listings: null,
        map: null,
        mapInitialized: false,

        init: function(listings){
            this.listings = listings;
            var _this = this;
            var mapOptions = {
                credentials:"AlnGUafJim9K7OtP3Ximx2ZgbtPPLJ954ctxyPBDVZs_iBiBfF57NBrP4Y3aM2tW",
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: 16,
                showScalebar: false
            };
            this.map = new Microsoft.Maps.Map(document.getElementById("map-canvas"), mapOptions);
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: function(){
                var zip = decodeURIComponent(location.pathname.split('search/')[1]);
                var search = new Microsoft.Maps.Search.SearchManager(_this.map);
                search.geocode({where:zip, count:10, callback: function(geocodeResult, userData){
                    _this.geocodeCallback(geocodeResult, userData);
                }});
                
             } 
            });
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
                console.log(card.attr('class'));
                var isSelect = card.hasClass('select');
                var inViewPort = true; //(i < _this.cardsPerHalfPage);
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
                    // _this.showGuestCard(card);
                });
            });
            //Map is initialized
            _this.mapInitialized = true;

            //Get bounding box from group of pins
            _this.centerOnPinGroup(locs);
            // Microsoft.Maps.Events.addHandler(_this.map, 'mousemove', _this.mapMoving);
        },

        centerOnPinGroup: function(pins){
            var bounds = new Microsoft.Maps.LocationRect.fromLocations(pins);

            //Set map bounds
            this.map.setView({
                bounds: bounds
            });
        },

        mapMoved: function(e){
            var _this = this;
            var map = this.map;
            var point = new Microsoft.Maps.Point(e.getX(), e.getY());
            var loc = e.target.tryPixelToLocation(point);
            var coords = loc.latitude + ", " + loc.longitude;

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
                        // _this.currentListingsPage = null;
                        // _this.lastSearchString = null;
                        // _this.loadResultsSet(searchString);
                    }
                }
            });
        },

        mapMoving: function(e){

        }
	});
    return new fullMapViewEl();
});