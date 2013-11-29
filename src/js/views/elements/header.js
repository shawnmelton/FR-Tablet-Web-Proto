define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var headerViewEl = Backbone.View.extend({
        el: "header",

        events: {
            'touchstart #logo': 'onLogoClick'
        },

        onLogoClick: function(event) {
            event.preventDefault();
            Navigate.toUrl('/');
        }
    });

    return new headerViewEl();
});