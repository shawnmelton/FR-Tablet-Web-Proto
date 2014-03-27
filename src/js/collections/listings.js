define([
  'underscore',
  'backbone',
  'models/listing'
], function(_, Backbone, ListingModel){
  var ListingCollection = Backbone.Collection.extend({
    model: ListingModel,
    url: '/api.php',
    parse: function(response) {
        return response.listings;
    }
  });
  return ListingCollection;
});