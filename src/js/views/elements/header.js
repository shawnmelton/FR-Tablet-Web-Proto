define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var headerViewEl = Backbone.View.extend({
        el: "header",

        events: {
            'click #logo': 'onLogoTouch'
        },

        makeSticky: function() {
            this.$el.addClass('sticky');
        },

        onLogoTouch: function(event) {
            event.preventDefault();
            Navigate.toUrl('/');
        },

        removeSticky: function() {
            this.$el.removeClass('sticky');
        }
    });

    return new headerViewEl();
});