define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/data', 'tools/navigate',
    'tools/device'
], function($, Backbone, tmplts, searchBarViewEl, Data, Navigate, Device) {
    var homeView = Backbone.View.extend({
        el: "#content",
        contentHeight: 0,
        map: null,

        /**
         * Display the device appropriate background image according to the size of the layout.
         */
        displayBGImg: function() {
            var clsName = 'home768';
            switch (Device.getType()) {
                case 'retina':
                    clsName = 'home2048';
                    break;
                case 'tablet':
                    clsName = 'home1024';
                    break;
            }

            document.getElementsByTagName('html')[0].className = clsName;
        },

        render: function() {
            this.$el.empty();

            searchBarViewEl.renderToContent();

            this.$el.append(JST['src/js/templates/layouts/home.html']({
                properties: Data.get('basic', 4)
            }));

            this.$el.attr("class", "home");
            this.displayBGImg();
            this.setResizeEvent();
            this.setEvents();
        },

        /**
         * Set the touch/click event to the properties at the bottom of the view.
         */
        setEvents: function() {
            this.$el.find("div.property").unbind(touchEventType);
            this.$el.find("div.property").bind(touchEventType, function(event) {
                event.preventDefault();
                Navigate.toUrl('/properties/' + $(this).attr('property'));
            });
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
        }
    });

    return new homeView();
});
