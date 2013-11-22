define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var homeView = Backbone.View.extend({
        el: "#content",

        render: function(){
            this.$el.html(JST['src/js/templates/layouts/home.html']({
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
        },
    });
    
    return new homeView();
});