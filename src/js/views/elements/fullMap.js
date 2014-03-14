define(['jquery', 'backbone'],
    function($, Backbone) {
    var fullMapViewEl = Backbone.View.extend({
        fullMapEl: null
    });

    return new fullMapViewEl();
});