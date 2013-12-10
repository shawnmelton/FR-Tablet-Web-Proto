define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var footerViewEl = Backbone.View.extend({
        el: "footer",
        links: null,
        currentLink: null,

        /**
         * Activate the last activated link.  If not applicable, then activate first link.
         */
        activateCurrentLink: function() {
            if(this.currentLink !== null) {
                this.activateLink(this.currentLink);
            } else {
                this.activateLink($('footer a').first().attr('rel'));
            }
        },

        /**
         * Activate a specific link with the provided rel attribute value.
         */
        activateLink: function(rel) {
            this.currentLink = rel;
            this.deactivateAllLinks();
            $('footer a[rel="'+rel+'"]').addClass('active');
        },

        clear: function() {
            this.$el.removeClass('sticky');
            this.$el.empty();

            if(this.links !== null) {
                this.links.unbind(touchEventType);
                this.links = null;
            }
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
        onNavItemTouch: function(link) {
            this.deactivateAllLinks();
            link.addClass('active');
        },

        render: function(links) {
            this.$el.html(JST['src/js/templates/elements/footerProfile.html']({
                links: links,
                size: parseInt(100 / links.length)
            }));
            this.links = $('footer > nav > div > a');
            this.setEvents();
        },

        /**
         * Set events on the footer links.
         */
        setEvents: function() {
            var _this = this;
            this.links.bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onNavItemTouch($(this));
            });
        },

        show: function() {
            this.$el.show();
        }
    });

    return new footerViewEl();
});