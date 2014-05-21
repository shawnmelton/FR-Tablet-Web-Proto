define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/data', 'tools/navigate',
    'tools/device', 'models/listing','collections/listings'
], function($, Backbone, tmplts, searchBarViewEl, Data, Navigate, Device, ListingModel, ListingCollection) {
    var homeView = Backbone.View.extend({
        el: "#content",
        contentHeight: 0,
        map: null,
        featuredListings: null,

        /**
         * Display the device appropriate background image according to the size of the layout.
         */
        displayBGImg: function() {
            var clsName = 'home768';
            switch (Device.getType()) {
                case 'retina':
                    clsName = 'home2048';
                    break;
                case 'tablet':
                    clsName = 'home1024';
                    break;
            }

            document.getElementsByTagName('html')[0].className = clsName;
        },

        getLocation: function(){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition);
            }
            else{
                console.log("Geolocation is not supported by this browser.");
            }
        },

        showPosition: function(){

        },

        getFeaturedProperties: function(){
            var _this = this;
            function getLocation()
            {
                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(showPosition);
                }
                else{
                    console.log("Geolocation is not supported by this browser.");
                }
            }
            function showPosition(position){
                var lat = position.coords.latitude.toString().substring(0,6);
                var lng = position.coords.longitude.toString().substring(0,7);
                console.log("Latitude: " + lat + 
                "<br>Longitude: " + lng); 

                $.ajax({
                    type: 'GET',
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=false&key=AIzaSyAud0d5aoF02nsLFR9mLtR1KkKEZ-7DzGw',
                    success: function(response){
                        var cityName = response.results[4].address_components[1].long_name;
                        var searchOptions = {
                            limit: 4,
                            start: 0,
                            product: 'Select',
                            city: cityName
                        };
                        $('[name="keywords"]').val(cityName);

                        _this.featuredListings = new ListingCollection();
                        _this.featuredListings.fetch({
                            data: $.param(searchOptions),
                            success: function(response){
                                //Remove loading image
                                console.log(_this.featuredListings);

                                _this.$el.append(JST['src/js/templates/layouts/home.html']({
                                    properties: _this.featuredListings.models
                                }));

                                $('#video_lightbox').height($(window).height());

                                _this.setFeaturedClickEvents();
                            }
                        });  
                    }
                }); 
            }
            getLocation();
        },

        onPropertyClick: function(){

        },

        render: function() {
            this.$el.empty();
            this.getFeaturedProperties();
            if($('#map-canvas').length) $('#map-canvas').removeClass('showMap');
            this.$el.prepend(JST['src/js/templates/elements/videoLightbox.html']({
                source: ''
            }));
            searchBarViewEl.renderToContent();

            this.$el.attr("class", "home");
            this.displayBGImg();
            this.setResizeEvent();
            this.setEvents();
        },

        /**
         * Set the touch/click event to the properties at the bottom of the view.
         */
        setEvents: function() {
            this.$el.find("div.property").unbind(touchEventType);
            this.$el.find("div.property").bind(touchEventType, function(event) {
                event.preventDefault();
                Navigate.toUrl('/properties/' + $(this).attr('property'));
            });
        },

        setFeaturedClickEvents: function(){
            var _this = this;
            var videoLightbox = $('#video_lightbox');

            $('.property .playButton').bind(touchEventType, function(ev){
                videoLightbox.addClass('show');
                videoLightbox.not('video, .video_container').bind(touchEventType, function(ev){
                    $(this).removeClass('show');
                });
            });

            $('.property').bind(touchEventType, function(ev) {
                //Reject click event if user clicked Play Button
                if(ev.target == $('.playButton')[0]){
                    console.log('Clicked Play button!');
                    return false;
                }

                var homesId = $(this).attr('property');
                if(homesId !== 'undefined' && homesId !== false) {
                    Navigate.toUrl('/properties/'+parseInt(homesId));
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
        }
    });

    return new homeView();
});
