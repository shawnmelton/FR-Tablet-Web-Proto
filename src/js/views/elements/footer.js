define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var footerViewEl = Backbone.View.extend({
        el: "footer",
        links: null,

        events: {
            'click nav > div > a': 'onNavItemTouch'
        },

        activateLink: function(rel) {
            this.deactivateAllLinks();
            $('footer a[rel="'+rel+'"]').addClass('active');
        },

        deactivateAllLinks: function() {
            this.links.removeClass('active');
        },

        getHeight: function() {
            return parseInt(this.$el.height());
        },

        hide: function() {
            this.$el.hide();
        },

        makeSticky: function() {
            this.$el.addClass('sticky');
        },

        /**
         * Handle what happens when a navigation item is touched.
         */
        onNavItemTouch: function(event) {
            event.preventDefault();
            this.deactivateAllLinks();
            var activeLink = $(event.currentTarget).addClass('active');
        },

        render: function(links) {
            this.$el.html(JST['src/js/templates/elements/footerProfile.html']({
                links: links,
                size: parseInt(100 / links.length)
            }));
            this.links = $('footer > nav > div > a');
        },

        show: function() {
            this.$el.show();
        }
    });

    return new footerViewEl();
});