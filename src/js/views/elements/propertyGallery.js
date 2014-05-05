define(['jquery', 'backbone', 'libs/touchSwipe', 'views/elements/footer', 'views/elements/header', 'tools/device'],
    function($, Backbone, tsw, footerViewEl, headerViewEl, Device) {
    var galleryViewEl = Backbone.View.extend({
        galleryEl: null,
        currentImageEl: null,
        currentImageIndex: 0,
        bgImgWidth: null,
        bgImgHeight: null,
        contentWidth: null,
        contentHeight: null,
        images: [],
        property: null,
        propertyId: null,
        startingLeft: 0,
        startingTop: 0,
        lockLeftMove: false,
        lockRightMove: true,
        swipeHorizArrowEl: null,
        swipeDirLeft: true,
        fullDetailHeight: 300,
        mapSection: null,
        floorplansSection: null,
        teaserSections: null,
        reviewsSection: null,
        detailsSection: null,
        buttonCA: $('#buttonCA'),
        panelIsCollapsed: false,
        videoLightbox: null,
        photoLightbox: null,

        /**
         * The property images should always be first.
         */
        addFirstImage: function(url) {
            this.currentImageEl = $('<img src="' + this.images[0] + '" '+
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
         *  Expand or contract the details panel on a property
         *  @param open <BOOL> 1 - Open panel, 0 - Close
         */
        toggleDetailsPanel: function(open, progress){
            console.log('Progress: ', progress);
            if(open){

                //Change background opacity of CA button
                this.buttonCA.css('background-color', 'rgba(233, 125, 14, 1)');

                this.teaserSections.animate({
                    'opacity' : 1
                });
                $('#teaser .info').animate({
                    'height' : this.fullDetailHeight
                });
            }
            else{

                //Change background opacity of CA button
                this.buttonCA.css('background-color', 'rgba(233, 125, 14, 0.5)');
                this.teaserSections.animate({
                    'opacity' : 0
                });
                $('#teaser .info').animate({
                    'height' : 80
                });
            }
        },

        /**
         *  Expand or contract the details panel on a property
         *  @param open <BOOL> 1 - Open panel, 0 - Close
         */
        updateDetailsPanel: function(open, progress){
            if(open){
                
                this.floorplansSection.css('opacity', 0);
                this.reviewsSection.css('opacity', 0);
                this.detailsSection.css('opacity', 0);
                $('#teaser .info').height(80);

                //Do things once the panel is fully toggled
                if(typeof complete == 'function'){
                    complete();
                }
            }
            else{

            }
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
            //Cache reference to hideable teaser sections
            //for bulk animations
            this.teaserSections = $('#teaser .info p[section="reviews"], #teaser .info p[section="floorplans"], #teaser .info div[section="video"], #teaser .info p[section="details"]');
            this.fullDetailHeight = $('#teaser .info').height();
            this.mapSection = $('#teaser .info p[section="map"]');
            this.floorplansSection = $('#teaser .info p[section="floorplans"]');
            this.reviewsSection = $('#teaser .info p[section="reviews"]');
            this.detailsSection = $('#teaser .info p[section="details"]');
            this.buttonCA = $('#buttonCA');

            this.photoLightbox = $('#photo_lightbox');
            // this.photoLightbox.bind('click', function(ev){
            //     $(this).removeClass('show');
            // });
            this.photoLightbox.bind('touchmove', function(ev){
                ev.preventDefault();
                return false;
            });

            this.contentWidth = $(window).width();
            this.contentHeight = $(window).height() - footerViewEl.getHeight();

            this.addFirstImage();
            this.setSwipeEvent();
            this.setLightBoxSwipeEvent();
            this.setHorizArrowEvent();
        },

        /**
         * Add an image to the gallery.  It will be placed directly behind (before) the provided image object.
         * @param url <String> The url to the image.
         * @param nextEl <Image Object>
         * @return img <Image Object> Image that was just created and added to the DOM.
         */
        loadImage: function(url, nextEl) {
            var _this = this;
            var img = $('<img src="'+ url +'" width="'+ this.bgImgWidth +'">');
            var newImg= document.createElement('img');
            newImg.src= img.attr('src');
            var container = $('<div class="photo_container"></div>');
            container.width($('#content').width());

            $(newImg).swipe({
                click: function(ev){
                    console.log('Click');
                    if($(ev.target).hasClass('scaledOut')){
                        $(ev.target).removeClass('scaledOut');
                    }
                    else{
                        _this.photoLightbox.removeClass('show');
                        _this.photoLightbox.width(container.width());
                    }
                },
                doubleTap: function(ev, image){
                    $(image).toggleClass('scaledOut');
                },
                pinchStatus: null
            });

            function zoomImage(event, direction, distance, duration, fingerCount, zoom, last){
                if(fingerCount >= 2){
                    $(event.target).css('-webkit-transform', 'scale(' + last + ')');
                }
            }

            container.append(newImg);
            this.photoLightbox.append(container);
            this.photoLightbox.width($('#content').width() * this.photoLightbox.find('.photo_container').length);

            nextEl.before(img);
            this.centerImage(img);
            return img;
        },

        /**
         * Load the next image in the set.
         */
        loadNextImage: function() {
            console.log('Load Next Image');
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
                //Only affect Details Panel when swiping
                //the first image.
                if(targetImg.hasClass('first')){
                    var goingLeft = (moveDirection != 'left');
                    this.toggleDetailsPanel(goingLeft);
                }

                //Preloading images
                if(moveDirection === 'left') {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }
            else if(newImgLeft === revertPos && targetImg.hasClass('first')) {
                var open = (moveDirection === 'left');
                this.toggleDetailsPanel(open);
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
            console.log('Reset Gallery: ', this.property);
            this.images = [];
            var images = this.property.attributes.images;
            var imageCount = images.length;
            for(i = 0; i < this.property.attributes.images.length; i++){
                this.images.push(images[i]);
            }
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

        setProperty: function(property) {
            this.property = property;
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
            var imageCount = this.galleryEl.children('img').length;
            this.galleryEl.swipe({
                click: function(event) {

                    var contentWidth = $('#content').width();
                    var contentHeight = $('#content').height();
                    imageCount = _this.galleryEl.children('img').length;

                    //Add 'show' class to Lightbox
                    //Set lightbox height to content height
                    //Loop over Gallery Images
                    //Check to make sure image isn't added
                    //Set image container width to content width
                    //Add image container with image inside
                    //Adjust Lightbox width to image count * content width
                    //Set Lightbox offset to that of the image that was clicked
                    /*Add other images as user swipes*/

                    $(_this.photoLightbox).addClass('show');
                    $(_this.photoLightbox).height(contentHeight);

                    for(i=0; i < imageCount; i++){
                        var currentImage = $(_this.galleryEl.children('img')[i]);
                        var imageAlreadyAdded = $(_this.photoLightbox).has('img[src="' + currentImage.attr('src') + '"]').length;
                        //Check if this image has already been added
                        if(!imageAlreadyAdded){
                            var img= document.createElement('img');
                            img.src= currentImage.attr('src');
                            var container = $('<div class="photo_container"></div>');
                            container.width(contentWidth);
                            container.append(img);
                            $(_this.photoLightbox).append(container);
                        }
                    }

                    $(_this.photoLightbox).width(contentWidth * imageCount);
                },
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
                        
                        var panArea, 
                            percentPanDistance,
                            heightDifference,
                            panelHeight,
                            buttonOpacity;

                        switch(direction.toString().toLowerCase()) {
                            case 'left':
                                if(!_this.lockLeftMove) {

                                    //Change opacity of floorplans, reviews, and details on pan
                                    if($(_this.currentImageEl).hasClass('first')) {
                                        panArea = _this.contentWidth/2;
                                        percentPanDistance = (panArea - distance*2) / panArea;
                                        
                                        //Only change opacity of the bottom three panels
                                        _this.teaserSections.css('opacity', percentPanDistance);

                                        buttonOpacity = (percentPanDistance < 0.5) ? 0.5 : percentPanDistance;

                                        //Change background opacity of CA button
                                        _this.buttonCA.css('background', 'rgba(233, 125, 14, ' + buttonOpacity + ')');

                                        //Percent to min-height: 80
                                        heightDifference = _this.fullDetailHeight;
                                        panelHeight = percentPanDistance * heightDifference;
                                        panelHeight = (panelHeight < 80) ? 80 : panelHeight;
                                        panelHeight = (panelHeight > _this.fullDetailHeight) ? _this.fullDetailHeight : panelHeight;

                                        //Difference in height * percent
                                        $('#teaser .info').height(panelHeight);
                                        console.log('Teaser Height: ', panelHeight);
                                    }

                                    _this.currentImageEl.css('-webkit-transform',
                                        'translate('+ (_this.startingLeft - distance) +'px, '+ _this.startingTop +'px)');
                                }
                                break;

                            case 'right':
                                if(!_this.lockRightMove) {
                                    if($(_this.currentImageEl).next().hasClass('first')){
                                        panArea = _this.contentWidth/2;
                                        percentPanDistance = distance*2 / panArea;
                                        
                                        //Only change opacity of the bottom three panels
                                        _this.teaserSections.css('opacity', percentPanDistance);

                                        buttonOpacity = (percentPanDistance < 0.5) ? 0.5 : percentPanDistance;

                                        //Change background opacity of CA button
                                        _this.buttonCA.css('background', 'rgba(233, 125, 14, ' + buttonOpacity + ')');

                                        //Percent to min-height: 80
                                        heightDifference = _this.fullDetailHeight;
                                        panelHeight = percentPanDistance * heightDifference;
                                        panelHeight = (panelHeight < 80) ? 80 : panelHeight;
                                        panelHeight = (panelHeight > _this.fullDetailHeight) ? _this.fullDetailHeight : panelHeight;

                                        //Difference in height * percent
                                        $('#teaser .info').height(panelHeight);
                                        console.log('Teaser Height: ', panelHeight);
                                    }

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


        setLightBoxSwipeEvent: function() {

            var _this = this;
            var IMG_WIDTH = $('#content').width(),
                imageCount = 0,
                currentImg=0,
                imageLock = false,
                speed=500;

            this.photoLightbox.swipe( {
                triggerOnTouchEnd : true,
                swipeStatus : swipeStatus,
                // click : close,
                allowPageScroll:"vertical"
            });

            // function close(){
            //     _this.photoLightbox.removeClass('show');
            // }

            function swipeStatus(event, phase, direction, distance, fingers)
            {
                imageCount = _this.photoLightbox.find('.photo_container').length;
                //If we are moving before swipe, and we are going L or R, then manually drag the images
                if( phase=="move" && (direction=="left" || direction=="right") )
                {
                    var duration=0;

                    if (direction == "left")
                        scrollImages((IMG_WIDTH * currentImg) + distance, duration);

                    else if (direction == "right")
                        scrollImages((IMG_WIDTH * currentImg) - distance, duration);
                }

                //Else, cancel means snap back to the begining
                else if ( phase == "cancel")
                {
                    scrollImages(IMG_WIDTH * currentImg, speed);
                }

                //Else end means the swipe was completed, so move to the next image
                else if ( phase =="end" )
                {
                    if (direction == "right")
                        previousImage();
                    else if (direction == "left")
                        nextImage();
                }
            }

            function previousImage()
            {
                currentImg = Math.max(currentImg-1, 0);
                scrollImages( IMG_WIDTH * currentImg, speed);
            }

            function nextImage()
            {
                currentImg = Math.min(currentImg+1, imageCount-1);
                scrollImages( IMG_WIDTH * currentImg, speed);
                _this.loadNextImage();
            }

            /**
             * Manually update the position of the imgs on drag
             */
            function scrollImages(distance, duration)
            {
                if(!imageLock){
                    _this.photoLightbox.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");

                    //inverse the number we set in the css
                    var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
                    _this.photoLightbox.bind('webkitTransitionEnded', function(){
                        imageLock = false;
                        _this.photoLightbox.unbind('webkitTransitionEnded');
                        _this.photoLightbox.find('.scaledOut').removeClass('scaledOut');
                    });
                    _this.photoLightbox.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
                }
            }
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