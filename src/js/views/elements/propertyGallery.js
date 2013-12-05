define(['jquery', 'backbone', 'libs/touchSwipe','views/elements/footer', 'tools/device'], 
    function($, Backbone, tsw, footerViewEl, Device) {
    var galleryViewEl = Backbone.View.extend({
        galleryEl: null,
        currentImageEl: null,
        bgImgWidth: null,
        bgImgHeight: null,
        contentWidth: null,
        contentHeight: null,
        images: [
            '/img/gallery/1-[SIZE].jpg',
            '/img/gallery/2-[SIZE].jpg',
            '/img/gallery/3-[SIZE].jpg',
            '/img/gallery/4-[SIZE].jpg',
            '/img/gallery/5-[SIZE].jpg'
        ],
        propertyId: null,
        startingLeft: 0,
        lockLeftMove: false,
        lockRightMove: true,
        swipeArrowEl: null,
        swipeDirLeft: true,

        /**
         * The property images should always be first.
         */
        addFirstImage: function(url) {
            this.currentImageEl = $('<img src="/img/listings/'+ this.propertyId +'-'+ this.bgImgWidth +'.jpg" '+
                'width="'+ this.bgImgWidth +'">');
            this.currentImageEl
                .addClass('first')
                .on('dragstart', function(ev) {
                    ev.preventDefault();
                });

            this.galleryEl.prepend(this.currentImageEl);
            this.loadNextImage();
            this.loadNextImage();
        },

        /**
         * Initialize gallery.
         */
        init: function() {
            this.galleryEl = $(document.getElementById('gallery'));
            switch(Device.getType()) {
                case 'retina':
                    this.bgImgWidth = 2048;
                    this.bgImgHeight = 1536; 
                    break;

                case 'tablet':
                    this.bgImgWidth = 1365;
                    this.bgImgHeight = 1024; 
                    break;

                default:
                    this.bgImgWidth = 1024;
                    this.bgImgHeight = 768;
                    break;
            }

            this.contentWidth = $(window).width();
            this.contentHeight = $(window).height() - footerViewEl.getHeight();

            this.addFirstImage();
            this.setSwipeEvent();
        },

        loadImage: function(url, nextEl) {
            var img = $('<img src="'+ url +'" width="'+ this.bgImgWidth +'">');
            nextEl.before(img);
            img
                .css('top', parseInt((this.contentHeight - parseInt(this.bgImgHeight)) / 2) +'px')
                .css('left', this.startingLeft +'px')
                .on('dragstart', function(ev) {
                    ev.preventDefault();
                });
            return img;
        },

        /**
         * Load the next image in the set.
         */
        loadNextImage: function() {
            if(this.images.length > 0) {
                var img = this.loadImage(this.images.pop().replace('[SIZE]', this.bgImgWidth), this.galleryEl.children('img').first());

                if(this.images.length === 0) {
                    img.addClass('last');
                }
            }
        },

        /**
         * Reverse the swipe arrow since the user cannot continue to swipe in that direction.
         */
        reverseSwipeArrow: function() {
            if(this.swipeArrowEl === null) {
                this.swipeArrowEl = $(document.getElementById('swipeArrow'));
            }

            if(this.swipeArrowEl.attr('src').indexOf('left') !== -1) {
                this.swipeArrowEl.attr('src', this.swipeArrowEl.attr('src').replace('left', 'right'));
            } else {
                this.swipeArrowEl.attr('src', this.swipeArrowEl.attr('src').replace('right', 'left'));
            }

            this.swipeDirLeft = !this.swipeDirLeft;
        },

        setPropertyId: function(id) {
            this.propertyId = id;
        },

        /**
         * Add event that will allow user to swipe to see additional images.
         */
        setSwipeEvent: function() {
            var _this = this;
            this.galleryEl.swipe({
                swipeLeft: function(event, direction, distance, duration, fingerCount) {
                    if(_this.lockLeftMove) {
                        return;
                    }

                    var newImgLeft = (-1 * _this.bgImgWidth);
                    if(distance < parseInt(_this.contentWidth * 0.12)) {
                        // Revert changes.
                        newImgLeft = _this.startingLeft;
                    } else {
                        _this.galleryEl.swipe('disable');
                    }

                    _this.currentImageEl.addClass('moving');
                    _this.currentImageEl.css('left', newImgLeft +'px');
                    setTimeout(function() {
                        _this.currentImageEl.removeClass('moving');
                        if(newImgLeft === (-1 * _this.bgImgWidth)) {
                            _this.nextImage();
                            _this.galleryEl.swipe('enable');
                        }
                    }, 525);
                },
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                    if(_this.lockRightMove) {
                        return;
                    }

                    var newImgLeft = _this.startingLeft;
                    if(distance < parseInt(_this.contentWidth * 0.12)) {
                        // Revert changes.
                        newImgLeft = (-1 * _this.bgImgWidth);
                    } else {
                        _this.galleryEl.swipe('disable');
                    }

                    _this.currentImageEl.next().addClass('moving');
                    _this.currentImageEl.next().css('left', newImgLeft +'px');
                    setTimeout(function() {
                        _this.currentImageEl.next().removeClass('moving');
                        if(newImgLeft === _this.startingLeft) {
                            _this.prevImage();
                           _this.galleryEl.swipe('enable'); 
                        }
                    }, 525);
                },
                swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
                    if(!_this.lockLeftMove && direction !== null && direction.toString().toLowerCase() === 'left') {
                        _this.currentImageEl.css('left', (_this.startingLeft - (distance * 2)) +'px');
                    } else if(!_this.lockRightMove && direction !== null && direction.toString().toLowerCase() === 'right') {
                        _this.currentImageEl.next().css('left', ((-1 * _this.bgImgWidth) + (distance * 2)) +'px');
                    }
                },
                threshold: 0,
                fingers: 1,
                allowPageScroll: 'vertical'
            });
        },

        /**
         * Move gallery to next image.
         */
        nextImage: function() {
            this.lockRightMove = false;
            this.currentImageEl = this.currentImageEl.prev();
            this.loadNextImage();

            if(this.currentImageEl.hasClass('last')) {
                this.lockLeftMove = true;

                if(this.swipeDirLeft) {
                    this.reverseSwipeArrow();
                }
            }
        },

        /**
         * Move gallery to prev image.
         */
        prevImage: function() {
            this.lockLeftMove = false;
            this.currentImageEl = this.currentImageEl.next();
            if(this.currentImageEl.hasClass('first')) {
                this.lockRightMove = true;

                if(!this.swipeDirLeft) {
                    this.reverseSwipeArrow();
                }
            }
        },

        /**
         * If this gallery has been set up.  If so, reset it.
         */
        reset: function() {
            this.currentImageEl = null;
        },

        /**
         * Update the images to be centered on the page.
         */
        update: function() {
            if(this.currentImageEl === null) {
                this.init();
            }

            // Center all of the images on the page.
            this.startingLeft = parseInt((this.contentWidth - this.bgImgWidth) / 2);
            this.galleryEl.children('img')
                .css('top', parseInt((this.contentHeight - this.bgImgHeight) / 2) +'px')
                .css('left', this.startingLeft +'px');
            this.currentImageEl = this.galleryEl.find('img.first');
        }
    });

    return new galleryViewEl();
});