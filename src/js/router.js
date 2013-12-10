define(['backbone', 'views/layouts/search', 'views/layouts/home', 'views/layouts/property', 
    'views/elements/header', 'views/elements/menu', 'views/elements/footer','views/elements/advancedSearch'], 
    function(Backbone, searchView, homeView, propertyView, headerViewEl, menuViewEl, footerViewEl,
        advancedSearchViewEl) {

    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            this.route(/^.*$/, 'showHome');
            this.route(/^search\/[a-z,A-Z,0-9, ,\,,\',\-,\%,\&,\;]+$/, 'showSearch');
            this.route(/^properties\/(\d+)$/, 'showProperty');
        },

        /**
         * Clean up the current page when its requested.
         */
        pageLoad: function(sticky) {
            // Reset page
            window.scrollTo(0,0);
            document.getElementsByTagName('html')[0].style.background = '';
            document.getElementsByTagName('html')[0].className = '';
            document.getElementById('content').style.height = '';

            menuViewEl.init();

            // Should fixed items stick to top of page?
            if(sticky) {
                headerViewEl.makeSticky();
                advancedSearchViewEl.makeSticky();
            } else {
                headerViewEl.removeSticky();
                advancedSearchViewEl.removeSticky();
            }

            advancedSearchViewEl.hide();
        },

        showHome: function() {
            this.pageLoad(false);
            footerViewEl.clear();
            footerViewEl.show();
            homeView.render();
        },

        showProperty: function() {
            this.pageLoad(true);
            footerViewEl.show();
            propertyView.render();
        },

        showSearch: function() {
            this.pageLoad(false);
            footerViewEl.hide();
            searchView.render();
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
    };
    
    return {
        initialize: initialize
    };
});