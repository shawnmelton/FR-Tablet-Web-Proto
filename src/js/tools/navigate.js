define([], function(){
    var Navigate = (function(){});
    Navigate.prototype = {
        /**
         * Uses pushstate if available.  Otherwise uses browser redirect.
         */
        toUrl: function(url) {
            if(!!(window.history && window.history.pushState)) {
                appRouter.navigate(url, {
                    trigger: true,
                    replace: true
                });
            } else {
                location.href = url;
            }
        }
    };

    return new Navigate();
});