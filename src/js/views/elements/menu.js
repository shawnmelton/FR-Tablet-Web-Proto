define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var menuViewEl = Backbone.View.extend({
        el: "body",
        displaying: null,
        menuEl: null,
        menuWidth: 0,
        initiated: false,

        hide: function() {
            if(this.displaying) {
                this.toggleMenu();
            }
        },

        /**
         * Render the menu if it is not showing.
         * Toggle back and forth between showing and not showing the menu.
         */
        onMenuButtonClick: function() {
            if(this.displaying === null) {
                this.render();
            }

            this.toggleMenu();
        },

        onMenuLinkClick: function(ev) {
            if($(ev.currentTarget).attr('href').match(/^http/)) {
                return;
            }

            ev.preventDefault();
            this.toggleMenu();
            Navigate.toUrl($(ev.currentTarget).attr('href'));
        },

        render: function() {
            this.$el.append(JST['src/js/templates/elements/menu.html']());
            this.displaying = false;
            this.menuEl = $(document.getElementById('menu'));
            this.menuWidth = this.menuEl.outerWidth();

            this.setEvents();
        },

        /**
         * Set the events related to this view.
         */
        setEvents: function() {
            var _this = this;
            this.menuEl.find('a').bind(touchEventType, function(ev) {
                _this.onMenuLinkClick(ev);
            });
        },

        slideMenu: function(newWidth) {
            this.menuEl.css('width', newWidth +'px');
        },

        /**
         * Toggle the menu to display or hide.
         */
        toggleMenu: function() {
            var newWidth = 250;
            if(this.displaying === true) {
                newWidth = 0;
            }

            this.slideMenu(newWidth);
            this.displaying = !this.displaying;
        }
    });

    return new menuViewEl();
});