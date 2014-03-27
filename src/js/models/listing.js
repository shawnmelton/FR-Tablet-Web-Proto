// Filename: models/project
define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var ListingModel = Backbone.Model.extend({
	    defaults: {
	      beds: "3",
	      city: "Norfolk",
	      lat: '',
	      lng: '',
	      state: "VA",
	      zip: '23510',
	      images: [],
	      homesId: '',
	      primaryImage: '',
	      streetAddress: ""
	    }
	});
	return ListingModel;
});