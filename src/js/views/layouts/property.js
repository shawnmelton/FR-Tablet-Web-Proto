define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'views/elements/footer',
    'tools/navigate', 'tools/data', 'views/elements/propertyGallery', 'views/elements/guestCardForm'],
    function($, Backbone, tmplts, searchBarViewEl, footerViewEl, Navigate, Data, galleryViewEl, guestCardFormEl){
    var propertyView = Backbone.View.extend({
        el: "#content",
        property: null,
        moreEl: null,
        moreContentEl: null,
        contentHeight: 0,
        linksInactive: true,

        /**
         * Load the content specific to the section that was clicked on.
         */
        loadSection: function(section) {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
                this.moreContentEl = $(document.getElementById('moreContent'));
            }

            // Load content from template instead.
            switch(section) {
                case 'floorplans': 
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyFloorPlans.html']());
                    break;

                case 'reviews':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyReviews.html']());
                    break;

                case 'details':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyDetails.html']({
                        property: this.property
                    }));
                    break;

                case 'map':
                    this.moreContentEl.html(JST['src/js/templates/elements/propertyMap.html']({
                        propertyAddress: this.property.address
                    }));
                    break;
            }
        },

        /**
         * Move down the page to the more section for additional property content.
         */
        moveToMore: function() {
            if(this.moreEl === null) {
                this.moreEl = $(document.getElementById('more'));
                this.moreContentEl = $(document.getElementById('moreContent'));
            }

            var moreElTopPos = this.moreEl.position().top;

            // Don't scroll to the More section unless the user isn't close.
            if($('body').scrollTop() < (moreElTopPos - 50)) {
                $('body').animate({
                    scrollTop: moreElTopPos +'px'
                },  500);
            }
        },

        /**
         * Handle what happens when the user clicks on the Check Availability button in the
         * property teaser.
         */
        onCheckAvailabilityClick: function() {
            this.moveToMore();
        },

        /**
         * Catch the event when the user clicks on a section of the Property teaser
         * Teaser is the section that displays on top of the property image.
         */
        onTeaserSectionClick: function(pEl) {
            this.moveToMore();
            this.loadSection(pEl.attr('section'));  
        },

        relayout: function() {
            this.setContentDimensions();
            galleryViewEl.update();
        },

        render: function(){
            if(!this.valid()) {
                return;
            }

            // Reset elements for this property view.
            this.moreEl = null;
            this.moreContentEl = null;

            this.$el.html(JST['src/js/templates/layouts/property.html']({
                property: this.property,
                moreContent: JST['src/js/templates/elements/propertyFloorPlans.html'](),
                guestCardForm: guestCardFormEl.getHTML()
            }));
            this.$el.attr("class", "property");

            guestCardFormEl.init();
            searchBarViewEl.renderToHeader();
            this.setProfileFooter();
            galleryViewEl.reset();
            this.relayout();

            // Events
            this.setResizeEvent();
            this.setTouchEvents();
            this.setScrollEvent();
        },

        /**
         * Set the content height for this page.
         */
        setContentDimensions: function() {
            this.contentHeight = $(window).height() - footerViewEl.getHeight();

            if(navigator.userAgent.match(/iPod|iPhone|iPad/i) &&
                navigator.userAgent.match(/Safari/i) && !(navigator.userAgent.match(/Chrome/i) ||
                navigator.userAgent.match(/CriOS/i))) {
                this.contentHeight -= 30;
            }

            this.$el.children('section').css('height', this.contentHeight +"px");
            this.$el.css('height', this.contentHeight +"px");
        },

        /**
         * Load footer with links that will take the user to additional property information.
         */
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
                cls: 'availability'
            }]);

            var _this = this;
            $('footer a').bind(touchEventType, function() {
                if($(this).hasClass('notNav')) {
                    // Share Button
                } else {
                    _this.moveToMore();

                    if($(this).attr('rel') !== 'availability') {
                        _this.loadSection($(this).attr('rel'));
                    }
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
         * Activate footer link when scrolling down.
         */
        setScrollEvent: function() {
            $(window).scroll(function() {
                if(this.linksInactive && $(this).scrollTop() > 50) {
                    footerViewEl.activateCurrentLink();
                    this.linksInactive = !this.linksInactive;
                } else if(!this.linksInactive && $(this).scrollTop() <= 50) {
                    footerViewEl.deactivateAllLinks();
                    this.linksInactive = !this.linksInactive;
                }
            });
        },

        /**
         * Set touchable item events.
         */
        setTouchEvents: function() {
            var _this = this;

            // Teaser sections.
            $('p.clickable').bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onTeaserSectionClick($(this));
            });

            // Check Availability Button.
            $(document.getElementById('buttonCA')).bind(touchEventType, function(ev) {
                ev.preventDefault();
                _this.onCheckAvailabilityClick();
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