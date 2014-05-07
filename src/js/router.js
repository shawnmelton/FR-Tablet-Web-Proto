define(['jquery', 'backbone', 'views/elements/header', 'views/elements/footer', 'views/elements/advancedSearch'], 
    function($, Backbone, headerViewEl, footerViewEl, advancedSearchViewEl) {

    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            this.route(/^.*$/, 'showHome');
            this.route(/^search\/[a-z,A-Z,0-9, ,\,,\',\-,\%,\&,\;]+$/, 'showSearch');
            this.route(/^properties\/(\d+)$/, 'showProperty');
        },

        /**
         * Clean up the current page when its requested.
         */
        pageLoad: function(view) {
            // Reset page
            window.scrollTo(0,0);
            document.getElementsByTagName('html')[0].style.background = '';
            document.getElementsByTagName('html')[0].className = '';
            document.getElementById('content').style.height = '';

            // Should fixed items stick to top of page?
            if(view === 'property') {
                headerViewEl.makeSticky();
                advancedSearchViewEl.makeSticky();
            } else {
                headerViewEl.removeSticky();
                advancedSearchViewEl.removeSticky();
            }

            advancedSearchViewEl.hide();

            // Property page watches resizing and scrolling events.  Lets unset these bindings.
            $(window).unbind('resize');
            $(window).unbind('scroll');
        },

        /**
         * Add a class to all buttons and links so that they are responsive.
         */
        setButtonEvents: function() {
            var buttons = $('a, button, p.clickable, div.property');
            buttons.unbind('touchstart');
            buttons.unbind('touchend');
            buttons.bind('touchstart', function() {
                $(this).addClass('touched');
            });

            buttons.bind('touchend', function() {
                $(this).removeClass('touched');
            });
        },

        showHome: function() {
            this.pageLoad('home');
            footerViewEl.clear();
            footerViewEl.show();

            // Lazy Load the view.
            require(['views/layouts/home'], function(homeView) {
                homeView.render();
            });

            this.setButtonEvents();
        },

        showProperty: function() {
            this.pageLoad('property');
            footerViewEl.show();

            // Lazy Load the view.
            require(['views/layouts/property'], function(propertyView) {
                propertyView.render();
            });

            this.setButtonEvents();
        },

        showSearch: function() {
            this.pageLoad('search');
            footerViewEl.hide();

            // Lazy Load the view.
            require(['views/layouts/search'], function(searchView) {
                searchView.render();
            });

            this.setButtonEvents();
        }
    });
    
    /**
     * Start the routing.  Make sure that we only use browser
     * push state if the browser supports it.
     */
    var initialize = function(){
        window.appRouter = new AppRouter();
        var usePushState = !!(window.history && window.history.pushState);
        Backbone.history.start({
            pushState: usePushState,
            hashChange: usePushState
        });
        
        if ( history.pushState ) history.pushState( {}, document.title, location.href );
    };
    
    return {
        initialize: initialize
    };
});