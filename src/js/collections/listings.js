define([
  'underscore',
  'backbone',
  'models/listing'
], function(_, Backbone, ListingModel){
  var ListingCollection = Backbone.Collection.extend({
    model: ListingModel,
    url: '/api.php',
    totalRecs: null,
    parse: function(response) {
        this.totalRecs = response.totalrecs;
        return response.listings;
    }
  });
  return ListingCollection;
});