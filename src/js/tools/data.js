define(['backbone'], function(Backbone) {
    var Data = (function() {});
    Data.prototype = {
        selects: null,
        basics: null,

        /**
         * Locate a property given an id.
         */
        findById: function(id) {
            if(this.selects === null) {
                this.generate();
            }

            var obj = null;
            this.selects.each(function(select) {
                if(parseInt(select.get('id')) === id) {
                    obj = select.toJSON();
                }
            });

            this.basics.each(function(basic) {
                if(parseInt(basic.get('id')) === id) {
                    obj = basic.toJSON();
                }
            });

            return obj;
        },

        generate: function() {
            this.selects = new Backbone.Collection([{
                id: 1,
                name: 'Apartment Name',
                location: 'City, St',
                type: 'Studio - 3 Beds',
                price: '$1,200 - 2,350',
                address: '150 Granby Street Norfolk, VA 23510'
            },{
                id: 5,
                name: 'Apartment Name',
                location: 'City, St',
                type: 'Studio - 3 Beds',
                price: '$1,400 - 2,100',
                address: '150 Granby Street Norfolk, VA 23510'
            }]);

            this.basics = new Backbone.Collection([{
                id: 2,
                name: 'Apartment Name',
                location: 'City, St',
                type: 'Studio - 3 Beds',
                price: '$900 - 1,600',
                address: '150 Granby Street Norfolk, VA 23510'
            },{
                id: 3,
                name: 'Apartment Name',
                location: 'City, St',
                type: 'Studio - 3 Beds',
                price: '$1,100 - 1,900',
                address: '150 Granby Street Norfolk, VA 23510'
            },{
                id: 4,
                name: 'Apartment Name',
                location: 'City, St',
                type: 'Studio - 3 Beds',
                price: '$1,100 - 1,900',
                address: '150 Granby Street Norfolk, VA 23510'
            }]);
        },

        get: function(type, count) {
            if(this.selects === null) {
                this.generate();
            }

            switch(type) {
                case 'select': return this.getDataSet(this.selects, count);
                case 'basic': return this.getDataSet(this.basics, count);
            }

            return null;
        },

        /**
         * Take collection and push it into a JSON array.
         */
        getDataSet: function(collection, count) {
            var data = [];
            var origSize = collection.size();
            while(data.length < count) { // Keep adding data to set
                data.push(collection.at(data.length % origSize).toJSON());
            }

            return data;
        }
    };

    return new Data();
});