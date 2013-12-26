define(['jquery', 'backbone', 'libs/touchSwipe','views/elements/footer', 'views/elements/header', 'tools/device'],
    function($, Backbone, tsw, footerViewEl, headerViewEl, Device) {
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
        startingTop: 0,
        lockLeftMove: false,
        lockRightMove: true,
        swipeHorizArrowEl: null,
        swipeDirLeft: true,

        /**
         * The property images should always be first.
         */
        addFirstImage: function(url) {
            this.currentImageEl = $('<img src="/img/listings/'+ this.propertyId +'-'+ this.bgImgWidth +'.jpg" '+
                'width="'+ this.bgImgWidth +'">');
            this.currentImageEl.addClass('first');

            this.galleryEl.prepend(this.currentImageEl);
            this.loadNextImage();
            this.loadNextImage();
        },

        /**
         * Center an image according to the size of the page.
         * @param img <Image Object(s)>
         */
        centerImage: function(img) {
            img.css('-webkit-transform', 'translate('+ this.startingLeft +'px, '+ this.startingTop +'px)');
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
            this.setHorizArrowEvent();
        },

        /**
         * Add an image to the gallery.  It will be placed directly behind (before) the provided image object.
         * @param url <String> The url to the image.
         * @param nextEl <Image Object>
         * @return img <Image Object> Image that was just created and added to the DOM.
         */
        loadImage: function(url, nextEl) {
            var img = $('<img src="'+ url +'" width="'+ this.bgImgWidth +'">');
            nextEl.before(img);
            this.centerImage(img);
            return img;
        },

        /**
         * Load the next image in the set.
         */
        loadNextImage: function() {
            if(this.images.length > 0) {
                var img = this.loadImage(this.images.pop().replace('[SIZE]', this.bgImgWidth),
                    this.galleryEl.children('img').first());

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

            // Locked.  Don't move.
            if((this.lockLeftMove && moveDirection === 'left') || (this.lockRightMove && moveDirection === 'right')) {
                return;
            }

            var targetImg = (moveDirection === 'left') ? this.currentImageEl : this.currentImageEl.next();

            // Revert changes if the user does not drag far enought.          
            var newImgLeft = (distance < parseInt(this.contentWidth * 0.12)) ? revertPos : movePos;

            targetImg
                .addClass('moving')
                .css('-webkit-transform', 'translate('+ newImgLeft +'px, '+ this.startingTop +'px)');

            if(newImgLeft === movePos) {
                if(moveDirection === 'left') {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }

            setTimeout(function() {
                targetImg.removeClass('moving');
            }, 405);
        },

        /**
         * Move gallery to next image.
         */
        nextImage: function() {
            if(this.lockRightMove) {
                this.lockRightMove = false;
            }

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
            if(this.lockLeftMove) {
                this.lockLeftMove = false;
            }

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
            if(this.swipeHorizArrowEl.hasClass('reverse')) {
                this.swipeHorizArrowEl.removeClass('reverse');
            } else {
                this.swipeHorizArrowEl.addClass('reverse');
            }

            this.swipeDirLeft = !this.swipeDirLeft;
        },

        /**
         * If the swipe arrow is touched, advance the photo gallery in the appropriate direction.
         */
        setHorizArrowEvent: function() {
            if(this.swipeHorizArrowEl === null) {
                this.swipeHorizArrowEl = $(document.getElementById('swipeHorizArrow'));
            }

            var _this = this;
            this.swipeHorizArrowEl.bind(touchEventType, function() {
                if(_this.swipeDirLeft) {
                    _this.moveCurrentImage((-1 * _this.bgImgWidth), _this.startingLeft, 2000);
                } else {
                    _this.moveCurrentImage(_this.startingLeft, (-1 * _this.bgImgWidth), 2000);
                }
            });
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
                    if(!_this.lockLeftMove) {
                        _this.moveCurrentImage((-1 * _this.bgImgWidth), _this.startingLeft, distance);
                    }
                },
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                    if(!_this.lockRightMove) {
                        _this.moveCurrentImage(_this.startingLeft, (-1 * _this.bgImgWidth), distance);
                    }
                },
                swipeUp: function(event, direction, distance, duration, fingerCount) {
                    headerViewEl.hideMenu();
                },
                swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
                    if(direction !== null) {
                        switch(direction.toString().toLowerCase()) {
                            case 'left':
                                if(!_this.lockLeftMove) {
                                    _this.currentImageEl.css('-webkit-transform',
                                        'translate('+ (_this.startingLeft - distance) +'px, '+ _this.startingTop +'px)');
                                }
                                break;

                            case 'right':
                                if(!_this.lockRightMove) {
                                    _this.currentImageEl.next().css('-webkit-transform', 
                                        'translate(-'+ (_this.bgImgWidth - distance) +'px, '+ _this.startingTop +'px)');
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
            this.startingTop = parseInt((this.contentHeight - this.bgImgHeight) / 2);
            this.centerImage(this.galleryEl.children('img'));
            this.currentImageEl = this.galleryEl.find('img.first');
        }
    });

    return new galleryViewEl();
});