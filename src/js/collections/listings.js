var Listings = Backbone.Collection.extend({
    model: Listing,
    // Url to request when fetch() is called
    url: 'http://api.smelton.frlabs.com/listings',
    parse: function(response) {
        return response.listings;
    },
    // Overwrite the sync method to pass over the Same Origin Policy
    sync: function(method, model, options) {
        var that = this;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: that.url,
                processData: false
            }, options);

        return $.ajax(params);
    }
});