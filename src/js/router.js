define(['backbone', 'views/layouts/search', 'views/layouts/home', 'views/layouts/property', 'views/elements/menu'], 
    function(Backbone, searchView, homeView, propertyView, menuViewEl) {

    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            this.route(/^search(\/|)$/, 'showSearch');
            this.route(/^property\/(\d+)$/, 'showProperty');
            this.route(/^\/?$/, 'showHome');
            this.route(/^$/, 'showHome');
        },

        showHome: function() {
            homeView.render();
        },

        showProperty: function() {
            document.getElementsByTagName('html')[0].className = "";
            propertyView.render();
        },

        showSearch: function() {
            document.getElementsByTagName('html')[0].className = "";
            searchView.render();
        }
    });
    
    /**
     * Start the routing.  Make sure that we only use browser
     * push state if the browser supports it.
     */
    var initialize = function(){
        var appRouter = new AppRouter();
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