define(['jquery', 'backbone', 'templates/jst', 'views/elements/searchBar', 'tools/navigate', 'tools/data', 
    'tools/Device'], function($, Backbone, tmplts, searchBarViewEl, Navigate, Data, Device){
    var propertyView = Backbone.View.extend({
        el: "#content",
        property: null,

        render: function(){
            if(!this.valid()) {
                return;
            }

            this.$el.html(JST['src/js/templates/layouts/property.html']({
                property: this.property
            }));
            this.$el.attr("class", "property");

            searchBarViewEl.renderToHeader();
            this.setBackgroundImage();
        },

        /**
         * Make sure we are displaying the appropriate quality background image for this page.
         */
        setBackgroundImage: function() {
            var imgSize = '1024';
            switch(Device.getType()) {
                case 'tablet':
                case 'mini': imgSize = "2048"; break;
            }

            document.getElementsByTagName('html')[0].style.background = 'url(/img/listings/'+ 
                this.property.id +'-'+ imgSize +'.jpg) no-repeat center center';
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

            return valid;
        }
    });
    
    return new propertyView();
});