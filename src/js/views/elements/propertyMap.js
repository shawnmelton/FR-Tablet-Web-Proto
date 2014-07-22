define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var propertyMapEl = Backbone.View.extend({
        property: null,
        map: null,
        listings: null,
        mapInitialized: false,

        init: function(property){
            this.property = property;

            var _this = this;
            var location = new Microsoft.Maps.Location(property.attributes.lat, property.attributes.lng);
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

            return this.map;
        },

        loadNearbyListings: function() {
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
    });

    return new propertyMapEl();
});