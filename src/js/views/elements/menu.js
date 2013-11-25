define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var menuViewEl = Backbone.View.extend({
        el: "body",
        displaying: null,
        menuEl: null,
        menuWidth: 0,

        events: {
            'click #menu': 'onMenuButtonClick'
        },

        /**
         * Render the menu if it is not showing.
         * Toggle back and forth between showing and not showing the menu.
         */
        onMenuButtonClick: function() {
            if(this.displaying === null) {
                this.render();
            }

            var newLeft = 0;
            if(this.displaying === true) {
                newLeft = (this.menuWidth * -1);
            }

            this.slideMenu(newLeft);
            this.displaying = !this.displaying;
        },

        render: function() {
            this.$el.append(JST['src/js/templates/elements/menu.html']());
            this.displaying = false;
            this.menuEl = $('body > nav');
            this.menuWidth = this.menuEl.outerWidth();
            console.log('Menu width: '+ this.menuWidth);
        },

        slideMenu: function(newLeft) {
            this.menuEl.animate({
                left: newLeft +"px"
            }, 250);
        }
    });

    return new menuViewEl();
});