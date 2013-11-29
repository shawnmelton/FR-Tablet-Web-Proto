define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/navigate', 'tools/data'],
    function($, Backbone, tmplts, searchBarViewEl, Navigate, Data){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,
        eventType: 'click', // 'touchstart',

        loadResultsSet: function() {
            $('.table > div > div > div').unbind(this.eventType);

            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroup.html']({
                selects: Data.get('select', 2),
                properties: Data.get('basic', 10)
            }));

            this.setPropertyClickEvents();
        },

        /**
         * Handle what happens when a property is touched/clicked.
         * @propertyId - Integer value.
         */
        onPropertyClick: function(propertyId) {
            Navigate.toUrl('/properties/'+propertyId);
        },

        /**
         * Render the search results view.
         * Load the first 10 results.
         */
        render: function(){
            this.setKeywords();
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");

            this.resultsEl = $(document.getElementById('results'));
            this.loadResultsSet();
            this.setInfiniteScrolling();
            searchBarViewEl.renderToHeader();
        },

        /**
         * Set the infinite scrolling so that results continue to load as the user swipes
         * down the screen.
         */
        setInfiniteScrolling: function() {
            _this = this;
            $(window).scroll(function(){
                if($(window).scrollTop() >= ($(document).height() - $(window).height() - 600)) {
                    _this.loadResultsSet();
                }
            });
        },

        /**
         * Get the keywords based on the url.
         * First make sure user did a proper search.
         */
        setKeywords: function() {
            if(!/^\/search\/[a-z,A-Z,0-9, ,\,,\',\-,\%,\&,\;]+$/i.test(location.pathname)) {
                Navigate.toUrl('/');          
            }

            searchBarViewEl.setKeywords(decodeURIComponent(location.pathname.split('search/')[1]));
        },

        /**
         * Make each property touchable.
         */
        setPropertyClickEvents: function() {
            var _this = this;
            $('.table > div > div > div').bind(this.eventType, function() {
                var propertyId = $(this).attr('property');
                if(propertyId !== 'undefined' && propertyId !== false) {
                    _this.onPropertyClick(parseInt(propertyId));
                }
            });
        }
    });
    
    return new searchView();
});