define(['jquery', 'backbone', 'templates/jst', 'tools/navigate'],
    function($, Backbone, tmplts, Navigate){
    var menuViewEl = Backbone.View.extend({
        el: "body",
        displaying: null,
        menuEl: null,
        menuWidth: 0,
        sticky: false,

        events: {
            'click #menuBtn': 'onMenuButtonClick',
            'click #menu > a': 'onMenuLinkClick'
        },

        /**
         * By "Sticky", I mean make the menu stick to the top of the page
         * and not scroll with the page.
         */
        makeSticky: function() {
            if(!this.sticky) {
                if(this.menuEl !== null) {
                    this.menuEl.addClass('sticky');
                }

                this.sticky = !this.sticky;
            }
        },

        /**
         * Render the menu if it is not showing.
         * Toggle back and forth between showing and not showing the menu.
         */
        onMenuButtonClick: function(ev) {
            ev.preventDefault();
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
        
        /**
         * Make the menu move along with the page scroll.
         */
        removeSticky: function() {
            if(this.sticky) {
                if(this.menuEl !== null) {
                    this.menuEl.removeClass('sticky');
                }

                this.sticky = !this.sticky;
            }
        },

        render: function() {
            this.$el.append(JST['src/js/templates/elements/menu.html']());
            this.displaying = false;
            this.menuEl = $('body > nav');
            this.menuWidth = this.menuEl.outerWidth();

            // If the menu is on a view where it needs to remain at the top of the page, then make that setting now.
            if(this.sticky) {
                this.menuEl.addClass('sticky');
            }
        },

        slideMenu: function(newLeft) {
            this.menuEl.animate({
                left: newLeft +"px"
            }, 250);
        },

        /**
         * Toggle the menu to display or hide.
         */
        toggleMenu: function() {
            var newLeft = 0;
            if(this.displaying === true) {
                newLeft = (this.menuWidth * -1);
            }

            this.slideMenu(newLeft);
            this.displaying = !this.displaying;
        }
    });

    return new menuViewEl();
});