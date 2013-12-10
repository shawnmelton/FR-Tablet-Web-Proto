define(['jquery', 'backbone', 'libs/touchSwipe','views/elements/footer', 'tools/device', 'views/elements/menu'], 
    function($, Backbone, tsw, footerViewEl, Device, menuViewEl) {
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
         * Move the current image.
         * @movePos The position of the image will go if it moves.
         * @revertPos The position of the image will go if it reverts back to previous position.
         * @distance How far the image was swiped by the user.
         */
        moveCurrentImage: function(movePos, revertPos, distance) {
            var moveDirection = (revertPos === this.startingLeft) ? 'left' : 'right';
            var newImgLeft;
            var targetImg;

            if(distance < parseInt(this.contentWidth * 0.12)) { // Revert changes.                
                newImgLeft = revertPos;
            } else {
                newImgLeft = movePos;
                this.galleryEl.swipe('disable');
            }

            if(moveDirection === 'left') {
                targetImg = this.currentImageEl;
            } else {
                targetImg = this.currentImageEl.next();
            }

            targetImg.addClass('moving');
            targetImg.css('left', newImgLeft +'px');

            var _this = this;
            setTimeout(function() {
                targetImg.removeClass('moving');
                if(newImgLeft === movePos) {
                    if(moveDirection === 'left') {
                        _this.nextImage();
                    } else {
                        _this.prevImage();
                    }

                    _this.galleryEl.swipe('enable');
                }
            }, 515);
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
            this.images = [
                '/img/gallery/1-[SIZE].jpg',
                '/img/gallery/2-[SIZE].jpg',
                '/img/gallery/3-[SIZE].jpg',
                '/img/gallery/4-[SIZE].jpg',
                '/img/gallery/5-[SIZE].jpg'
            ];
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
         * Tie in the scroll events to also:
         *  1. Close menu if its open and user scrolls down property profile page.
         *  2. Activate a footer tab if the user scrolls down page.
         *  3. Deactivate a footer tab if user scrolls up page.
         */
        setSwipeEvent: function() {
            var _this = this;

            this.galleryEl.swipe({
                swipeLeft: function(event, direction, distance, duration, fingerCount) {
                    if(_this.lockLeftMove) {
                        return;
                    }

                    _this.moveCurrentImage((-1 * _this.bgImgWidth), _this.startingLeft, distance);
                },
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                    if(_this.lockRightMove) {
                        return;
                    }

                    _this.moveCurrentImage(_this.startingLeft, (-1 * _this.bgImgWidth), distance);
                },
                swipeUp: function(event, direction, distance, duration, fingerCount) {
                    menuViewEl.hide();
                },
                swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
                    if(direction !== null) {
                        switch(direction.toString().toLowerCase()) {
                            case 'left':
                                if(!_this.lockLeftMove) {
                                    _this.currentImageEl.css('left', (_this.startingLeft - (distance * 1.25)) +'px');
                                }
                                break;

                            case 'right':
                                if(!_this.lockRightMove) {
                                   _this.currentImageEl.next().css('left', ((-1 * _this.bgImgWidth) + (distance * 1.25)) +'px');
                                }
                                break;
                        }
                    }
                },
                threshold: 0,
                fingers: 1,
                allowPageScroll: 'vertical'
            });
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