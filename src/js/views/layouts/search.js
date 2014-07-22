define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'views/elements/fullMap', 'tools/navigate', 'tools/data', 'models/listing','collections/listings'],
    function($, Backbone, tmplts, searchBarViewEl, fullMapEl, Navigate, Data, ListingModel, ListingCollection){
    var searchView = Backbone.View.extend({
        el: "#content",
        resultsEl: null,
        contentHeight: 0,
        pins: [],
        map: null,
        mapCanvas: $('#map-canvas'),
        userAddressTerms: null,
        propertyIndex: null,
        searchString: null,
        lastSearchString: null,
        userZip: null,
        lastZip: null,
        userState: null,
        userCity: null,
        currentListingsPage: null,
        currentSearchListingCount: 0, //How many recs have been loaded, to compare to total
        listingLimit: 20,
        scrollTriggerDistance: 600,
        newPageScrollTop: 0,
        cardsPerHalfPage: 0,
        morePropertiesExist: false,
        moreInfoPanel: null,
        lastPropertyId: null,

        /**
         * Render the search results view.
         * Load the first 10 results.
         */
        render: function(){
            var _this = this;
            this.searchString = decodeURIComponent(location.pathname.split('search/')[1]);
            this.loadResultsSet();
            this.setKeywords();
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");

            //Check for "Show Map" setting
            this.$el.addClass('showMap');
            this.mapCanvas.addClass('showMap');
            $('#map-container').show();

            //Check for orientation
            window.addEventListener("orientationchange", function() {
                _this.setContentDimensions();
            }, false);

            this.resultsEl = $(document.getElementById('results'));
            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroupPlaceholder.html']);
            this.resultsEl.find('.basic').each(function(i){
                pulsate(this, i);
            });

            function pulsate(card, i){
                $(card).delay(i * 200).fadeOut('slow').fadeIn('slow');
            }

            this.setInfiniteScrolling();
            this.setResizeEvent();
            this.setContentDimensions();
            searchBarViewEl.renderToHeader();

            $('#searchBar button').text('Search');
        },

        loadResultsSet: function(searchString) {
            var _this = this;
            $('#map-loader').removeClass('hidden');

            //Initialize to zero or increment based on whether
            //or not this is the first call of a new zip code
            if(_this.lastSearchString != _this.searchString || this.currentListingsPage === null){
                fullMapEl.mapInitialized = false;
                this.currentListingsPage = 0;
                _this.newPageScrollTop = 0;
            }
            else{
                this.currentListingsPage++;
            }

            //Show loading image
            $(_this.resultsEl).addClass('loading');

            var searchOptions = {
                limit: _this.listingLimit,
                start: _this.currentListingsPage*_this.listingLimit
            };

            this.searchString = searchString || this.searchString;

            //If search string is numeric, search by zip code
            if(this.isNumeric(this.searchString)){
                searchOptions.zip = this.searchString;
            }
            else{
                searchOptions.city = encodeURI(this.searchString);
            }

            this.listings = new ListingCollection();
            this.listings.fetch({
                data: $.param(searchOptions),
                success: function(response){
                    //Remove loading image
                    $(_this.resultsEl).removeClass('loading');
                    $('.results_placeholder').remove();

                    var numListings = response.length;
                    _this.morePropertiesExist = (response.length);
                    if(!_this.morePropertiesExist){
                        return;
                    }

                    //Increment listings shown
                    _this.currentSearchListingCount += numListings;

                    //Update current searched zip
                    _this.lastSearchString = _this.searchString;

                    _this.populateResults(numListings);
                },
                error: function(error){
                    $('#map-loader').addClass('hidden');  
                }
            });
        },

        populateResults: function(numListings){
            var _this = this;
            var blocks = 4;
            $('.table > div > div > div').unbind(touchEventType);
             
            this.resultsEl.append(JST['src/js/templates/elements/searchResultsGroup.html']({
                startIndex: this.propertyIndex,
                selects: (numListings >= blocks) ? _this.listings.slice(0,blocks) : _this.listings.slice(0,numListings),
                properties: (numListings > blocks) ? _this.listings.slice(blocks,numListings-blocks) : null,
                listings: _this.listings,
                numBlocksToPrint: blocks,          //Change this based or layout options
                numPropertiesToPrint: blocks       //Change this based or layout options
            }));

            var pageHeight = $(_this.resultsEl).find('.page').last().height();
            var cardCount = $(_this.resultsEl).find('.page').last().find('.basic').length;
            var cardRowHeight = $(_this.resultsEl).find('.page').last().find('.first').height();

            this.cardsPerHalfPage = cardCount/2;
            this.newPageScrollTop += $(_this.resultsEl).find('.page').last().height();
            this.setPropertyClickEvents();

            if(!fullMapEl.mapInitialized){
                fullMapEl.init(_this.listings);
            }

            $('#map-loader').addClass('hidden');
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
         * If the screen is resized, make sure we perform a relayout.
         */
        setResizeEvent: function() {
            var _this = this;
            var resizeTimeout = null;
            $(window).resize(function() {
                if (resizeTimeout !== null) {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = null;
                }

                resizeTimeout = setTimeout(function() {
                    _this.setContentDimensions();
                }, 250);
            });
        },

        /**
         * Set the content height for this page.
         */
        setContentDimensions: function() {
            this.contentHeight = $(window).height();

            if (navigator.userAgent.match(/iPod|iPhone|iPad/i) &&
                navigator.userAgent.match(/Safari/i) && !(navigator.userAgent.match(/Chrome/i) ||
                    navigator.userAgent.match(/CriOS/i))) {
                this.contentHeight -= 30;
            }

            if($(window).width() <= 768 || window.orientation === 0 || window.orientation === 180){
                this.$el.addClass('portrait');
                this.mapCanvas.addClass('portrait');
                $('#map-container').addClass('portrait');

                //If Portrait, the height is set by percentage,
                //so we need to clear out the inline css text
                this.$el.css('cssText', '');
                this.mapCanvas.css('cssText', '');
            }
            else{
                this.$el.removeClass('portrait');
                this.mapCanvas.removeClass('portrait');
                $('#map-container').removeClass('portrait');

                //If Landscape, set height by window height
                this.mapCanvas.css('height', (this.contentHeight - (this.contentHeight*0.01)) + "px");
                this.$el.css('height', this.contentHeight + "px");
            }
        },

        /**
         * Set the infinite scrolling so that results continue to load as the user swipes
         * down the screen.
         */
        setInfiniteScrolling: function() {
            var _this = this;
            $(window).scroll(function(){
                var isLoading = $(_this.resultsEl).hasClass('loading');
                var distanceScrolled = $(window).scrollTop();
                var scrollHeight = $(this).height();
                var scrollThreshold = _this.newPageScrollTop - (scrollHeight * 2);
                if(!isLoading && distanceScrolled >= scrollThreshold && _this.morePropertiesExist) {
                    // console.log('Load More Results');
                    _this.loadResultsSet();
                }
                else{
                    console.log('Still loading...');
                }

                if(distanceScrolled >= _this.newPageScrollTop/2){
                    console.log('Page Top: ', _this.newPageScrollTop, ', Scroll Height: ', scrollHeight);
                    console.log('Content Top: ', distanceScrolled, ', New Threshold: ', scrollThreshold);
                    console.log('Update Map');
                }
            });
        },

        /**
         * Make each property touchable.
         */
        setPropertyClickEvents: function() {
        var _this = this;
            $('.basic > .element > .front').bind(touchEventType, function() {
                var homesId = $(this).parent().attr('property');
                if(homesId !== 'undefined' && homesId !== false) {
                    //Get property index
                    
                    window.lastPropertyIndex = $('.basic > .element > .front').index();
                    window.currentListings = _this.listings;

                    _this.currentListingsPage = null;
                    _this.onPropertyClick(parseInt(homesId));
                }
            });
            $('.basic > .element > .back > .ca_button').bind(touchEventType, function(e) {
                _this.hideGuestCard($(this).parent().parent().parent());
                e.preventDefault();
                return false;
            });
            $('.basic > .element > .contact').bind(touchEventType, function(e) {
                _this.showGuestCard($(this).parent().parent());
                e.preventDefault();
                return false;
            });
            $('.basic > .element > .details').bind(touchEventType, function(e) {
                _this.showPropertyDetails($(this).parent().parent());
                e.preventDefault();
                return false;
            });
        },

        /**
         * Handle what happens when a property is touched/clicked.
         * @propertyId - Integer value.
         */
        onPropertyClick: function(homesId) {
            Navigate.toUrl('/properties/'+homesId);
        },

        hideGuestCard: function(card){
            card.find('.element').attr('class', 'element noOverflow flip');
            setTimeout(func, 100);
            function func() {
                card.find('.element').addClass('hasTransition');
                card.find('.element').removeClass('flip');
            }
        },

        showGuestCard: function(card){
            $('.marker').removeClass('active');
            if(!card) return;
            $(this).unbind(touchEventType);
            var cardIndex = card.index();
            var pinMarker = $('.pin' + (cardIndex+1)).find('.marker');
            pinMarker.addClass('active');
            
            var _this = this;
            var propertyId = card.find('.element').attr('property');
            var listTop = $(window).scrollTop();
            var cardPosition = card.find('.contact').offset();
            if(!cardPosition){
                console.log('Show loader');
                console.log('Load next page, and on load, scroll to that card');
            }

            var cardTop = cardPosition.top;
            var scrollAdjustment = 70;

            $('.basic').find('.element').not($(card)).attr('class', 'element noOverflow hasTransition');
            
            $(card).find('.element').bind('webkitTransitionEnd', function(e){
                $(this).unbind('webkitTransitionEnd');
                var cardOffset = $(card).offset();
                $(this).addClass('flipped noTransition');
                $(this).removeClass('hasTransition');
            });
            $(card).find('.element').addClass('flip');

            $('html, body').scrollTop($(card).offset().top - scrollAdjustment);
        },

        showMoreInfoPanel: function(card){
            var propertyId = card.find('.element').attr('property');
            var cardOffset = $(card).offset();
            var scrollAdjustment = 70;

            $('.basic').find('.element').not($(card)).attr('class', 'element noOverflow hasTransition');
            $('html, body').scrollTop($(card).offset().top - scrollAdjustment);

            //Load More Details template with property information
            this.moreInfoPanel = $(JST['src/js/templates/elements/moreInfoPanel.html']({
                propertyId: propertyId
            }));
            this.moreInfoPanel.height(0);

            if($(card).hasClass('select')){
                $(card).after(this.moreInfoPanel);
            }
            else if(cardOffset.left < $(card).width()){
                $(card).next().after(this.moreInfoPanel);
            }
            else{
                $(card).after(this.moreInfoPanel);
            }

            this.moreInfoPanel.animate({
                height: $(card).height()
            }, function(){
                this.lastPropertyId = propertyId;
            });
        },

        showPropertyDetails: function(card){
            var _this = this;
            var propertyId = card.find('.element').attr('property');

            if(_this.moreInfoPanel && _this.lastPropertyId == propertyId){
                // Hide/Remove existing moreInfoPanel
                _this.moreInfoPanel.animate({
                    height: 0
                }, function(){
                    _this.moreInfoPanel.remove();
                    _this.moreInfoPanel = null;
                });
                return;
            }

            //Hide/Remove existing moreInfoPanel
            if(this.moreInfoPanel){
                this.moreInfoPanel.height(0).remove();
                _this.showMoreInfoPanel(card);
                _this.showGuestCard(card);
            }
            else{
                _this.showMoreInfoPanel(card);
                _this.showGuestCard(card);
            }
        },

        isNumeric: function(n){
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
    });
    
    return new searchView();
});