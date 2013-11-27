define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar'],
    function($, Backbone, tmplts, searchBarViewEl){
    var homeView = Backbone.View.extend({
        el: "#content",

        /**
         * Display the device appropriate background image according to the size of the layout.
         */
        displayBGImg: function() {
            var dimensions = {
                width: $(window).outerWidth(),
                height: $(window).outerHeight()
            };

            var clsName = "home768";
            if(dimensions.width > 1000 || dimensions.height > 1000) {
                clsName = "home2048";
            } else if(dimensions.width > 768 || dimensions.height > 768) {
                clsName = "home1536";
            } else if(dimensions.width > 512 || dimensions.height > 512) {
                clsName = "home1024";
            }

            document.getElementsByTagName('html')[0].className = clsName;
        },

        render: function(){
            this.$el.empty();

            searchBarViewEl.renderToContent();

            this.$el.append(JST['src/js/templates/layouts/home.html']({
                properties: [{
                    name: "Apartment Name",
                    location: "City, St",
                    type: "Studio - 3 Beds",
                    img: "/img/apt.jpg"
                },{
                    name: "Apartment Name",
                    location: "City, St",
                    type: "Studio - 3 Beds",
                    img: "/img/apt.jpg"
                },{
                    name: "Apartment Name",
                    location: "City, St",
                    type: "Studio - 3 Beds",
                    img: "/img/apt.jpg"
                },{
                    name: "Apartment Name",
                    location: "City, St",
                    type: "Studio - 3 Beds",
                    img: "/img/apt.jpg"
                }]
            }));

            this.$el.attr("class", "home");
            this.displayBGImg();
        },
    });
    
    return new homeView();
});