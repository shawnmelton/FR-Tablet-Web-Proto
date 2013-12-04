define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'views/elements/footer', 
    'tools/navigate', 'tools/data', 'views/elements/propertyGallery'], function($, Backbone, tmplts, searchBarViewEl, 
    footerViewEl, Navigate, Data, galleryViewEl){
    var propertyView = Backbone.View.extend({
        el: "#content",
        property: null,
        eventType: 'click', // touchstart
        moreEl: null,
        contentHeight: 0,
        aboveTheFold: true,
        currentMoreSection: 'floorplans',

        /**
         * Load the content specific to the section that was clicked on.
         */
        loadSection: function(section) {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
            }

            this.currentMoreSection = section;

            // Load content from template instead.
            switch(section) {
                case 'floorplans': 
                    this.moreEl.html(JST['src/js/templates/elements/propertyFloorPlans.html']());
                    break;

                case 'reviews':
                    this.moreEl.html(JST['src/js/templates/elements/propertyReviews.html']());
                    break;

                case 'details':
                    this.moreEl.html(JST['src/js/templates/elements/propertyDetails.html']({
                        property: this.property
                    }));
                    break;

                case 'map':
                    this.moreEl.html(JST['src/js/templates/elements/propertyMap.html']());
                    break;
            }
        },

        /**
         * Move down the page to the more section for additional property content.
         */
        moveToMore: function() {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
            }

            var _this = this;
            $('body').animate({
                scrollTop: this.moreEl.position().top +'px'
            }, 1000);
        },

        relayout: function() {
            this.setContentDimensions();
            galleryViewEl.update();
        },

        render: function(){
            if(!this.valid()) {
                return;
            }

            this.$el.html(JST['src/js/templates/layouts/property.html']({
                property: this.property,
                moreContent: JST['src/js/templates/elements/propertyFloorPlans.html']()
            }));
            this.$el.attr("class", "property");

            searchBarViewEl.renderToHeader();
            this.setProfileFooter();
            this.relayout();

            // Events
            this.setScrollingEvents();
            this.setResizeEvent();
        },

        /**
         * Set the content height for this page.
         */
        setContentDimensions: function() {
            this.contentHeight = $(window).height() - footerViewEl.getHeight();
            this.$el.children('section').css('height', this.contentHeight +"px");
            this.$el.css('height', this.contentHeight +"px");
        },

        setProfileFooter: function() {
            footerViewEl.render([{
                rel: 'floorplans',
                text: 'Floor Plans &amp; Prices'
            }, {
                rel: 'details',
                text: 'Details'
            }, {
                rel: 'reviews',
                text: 'Reviews'
            }, {
                rel: 'map',
                text: 'Map &amp; Directions'
            }, {
                rel: 'share',
                text: 'Share',
                cls: 'notNav share'
            }, {
                rel: 'availability',
                text: 'Check Availability',
                cls: 'notNav availability'
            }]);

            var _this = this;
            $('footer a').bind(this.eventType, function() {
                if($(this).hasClass('notNav')) {

                } else {
                    _this.moveToMore();
                    _this.loadSection($(this).attr('rel'));
                }
            });

            footerViewEl.makeSticky();
        },

        /**
         * If the screen is resized, make sure we perform a relayout.
         */
        setResizeEvent: function() {
            var _this = this;
            var resizeTimeout = null;
            $(window).resize(function() {
                if(resizeTimeout !== null) {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = null;
                }

                resizeTimeout = setTimeout(function() {
                    _this.relayout();
                }, 250);
            });
        },

        /**
         * Set scrolling event to activate first link when user scrolls down.
         */
        setScrollingEvents: function() {
            var _this = this;
            var buffer = 10;
            $(document).scroll(function() {
                if(_this.aboveTheFold && ($(window).scrollTop() >= (_this.contentHeight - buffer))) {
                    footerViewEl.activateLink(_this.currentMoreSection);
                    _this.aboveTheFold = false;
                } else if(!_this.aboveTheFold && ($(window).scrollTop() < (_this.contentHeight - buffer))) {
                    footerViewEl.deactivateAllLinks();
                    _this.aboveTheFold = true;
                }
            });
        },

        /**
         * Verify that we are in fact on a valid property details view.
         * Parse the property Id from the url.
         */
        valid: function() {
            var valid = true;
            if(!/^\/properties\/\d+$/i.test(location.pathname)) {
                Navigate.toUrl('/');
                valid = false;
            }

            this.property = Data.findById(parseInt(decodeURIComponent(location.pathname.split('properties/')[1])));
            
            if(this.property === null) {
                Navigate.toUrl('/');
                valid = false;
            }

            galleryViewEl.setPropertyId(this.property.id);

            return valid;
        }
    });
    
    return new propertyView();
});