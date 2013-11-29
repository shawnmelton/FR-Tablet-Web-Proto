define(['backbone', 'views/layouts/search', 'views/layouts/home', 'views/layouts/property', 
    'views/elements/header', 'views/elements/menu'], function(Backbone, searchView, homeView, propertyView, 
    headerViewEl, menuViewEl) {

    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            this.route(/^.*$/, 'showHome');
            this.route(/^search\/[a-z,A-Z,0-9, ,\,,\',\-,\%,\&,\;]+$/, 'showSearch');
            this.route(/^properties\/(\d+)$/, 'showProperty');
        },

        showHome: function() {
            document.getElementsByTagName('html')[0].style.background = '';
            document.getElementsByTagName('footer')[0].style.display = '';
            homeView.render();
        },

        showProperty: function() {
            document.getElementsByTagName('html')[0].className = '';
            document.getElementsByTagName('footer')[0].style.display = '';
            propertyView.render();
        },

        showSearch: function() {
            document.getElementsByTagName('html')[0].style.background = '';
            document.getElementsByTagName('html')[0].className = '';
            document.getElementsByTagName('footer')[0].style.display = 'none';
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