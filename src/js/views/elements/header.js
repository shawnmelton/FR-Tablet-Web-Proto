define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var headerViewEl = Backbone.View.extend({
        el: 'header',
        menuViewEl: null,

        events: {
            'touchstart #logo': 'onLogoTouch',
            'touchstart #menuBtn': 'onMenuButtonTouch',
            'click #logo': 'onLogoTouch',
            'click #menuBtn': 'onMenuButtonTouch'
        },

        /**
         * If the menu has been loaded, hide it.
         */
        hideMenu: function() {
            if(this.menuViewEl !== null) {
                this.menuViewEl.hide();
            }
        },

        /**
         * Lazy load the menu only when necessary.
         */
        lazyLoadMenu: function() {
            var _this = this;
            require(['views/elements/menu'], function(menuViewEl) {
                _this.menuViewEl = menuViewEl;
            });
        },

        makeSticky: function() {
            this.$el.addClass('sticky');
        },

        onLogoTouch: function(ev) {
            ev.preventDefault();
            Navigate.toUrl('/');
        },

        /**
         * Handle what happens when the menu button has been touched.
         * Lazy load menu so that it is not built until button is touched.
         */
        onMenuButtonTouch: function(ev) {
            ev.preventDefault();
            this.lazyLoadMenu();
            this.menuViewEl.onMenuButtonClick();
        },

        removeSticky: function() {
            this.$el.removeClass('sticky');
        }
    });

    return new headerViewEl();
});