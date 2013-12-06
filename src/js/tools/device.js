define([], function() {
    var Device = (function() {});

    Device.prototype = {
        size: null,
        type: null,

        /**
         * Possible options: tablet, mini (tablet), phablet or phone
         */
        getType: function() {
            if(this.type === null) {
                this.setType();
            }

            return this.type;
        },

        /**
         * Based on the dimensions of the device, take a guess at what type it is.
         */
        setType: function() {
            var height = $(window).outerHeight();
            var width = $(window).outerWidth();

            if(height > width) {
                this.size = height;
            } else {
                this.size = width;
            }

            if(this.size > 1024) {
                this.type = 'retina';
            } else if(this.size > 768) {
                this.type = 'tablet';
            } else if(this.size > 600) {
                this.type = 'mini';
            } else if(this.size > 400) {
                this.type = 'phablet'; // larger phone
            } else {
                this.type = 'phone';
            }
        }
    };

    return new Device();
});