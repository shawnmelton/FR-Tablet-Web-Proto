define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,

        loadResultsSet: function() {
            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroup.html']({
                selects: [{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt-large.jpg',
                    price: '$1,200 - 2,350'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt-large.jpg',
                    price: '$1,200 - 2,350'
                }],
                properties: [{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                },{
                    name: 'Apartment Name',
                    location: 'City, St',
                    type: 'Studio - 3 Beds',
                    img: '/img/apt.jpg'
                }]
            }));
        },

        render: function(){
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");

            this.resultsEl = $(document.getElementById('results'));
            this.loadResultsSet();
        }
    });
    
    return new searchView();
});