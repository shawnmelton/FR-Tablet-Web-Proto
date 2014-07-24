define(['jquery', 'backbone', 'templates/jst', 'tools/navigate','views/elements/guestCardForm'],
    function($, Backbone, tmplts, Navigate, guestCardFormEl){
    var propertyViewEl = Backbone.View.extend({
        getHTML: function(property){
            var _this = this;
            var hasVideo = (typeof property.attributes.video !== 'undefined');
            
            guestCardFormEl.init(property);

            return JST['src/js/templates/layouts/property.html']({
                property: property,
                lightbox: JST['src/js/templates/elements/property/sendToCellForm.html'](),
                videoLightbox: (hasVideo) ? JST['src/js/templates/elements/videoLightbox.html']({
                    source: property.attributes.video
                }) : '',
                detailsSection: JST['src/js/templates/elements/property/propertyDetails.html']({
                    name: property.name,
                    beds: property.attributes.beds,
                    price: property.attributes.price,
                    description: property.attributes.description,
                    pet_policy: property.attributes.pet_policy
                }),
                floorplansSection: JST['src/js/templates/elements/property/propertyFloorPlans.html']({
                    floor_plans: property.attributes.floor_plans
                }),
                amenitiesSection: (typeof property.attributes.features !== 'undefined') ? JST['src/js/templates/elements/property/propertyAmenities.html']({
                    features: property.attributes.features
                }) : '',
                reviewsSection: JST['src/js/templates/elements/property/propertyReviews.html']({
                    floor_plans: property.attributes.floor_plans
                }),
                mapSection: JST['src/js/templates/elements/property/propertyMap.html']({
                    streetAddress: property.attributes.streetAddress,
                    city: property.attributes.city,
                    state: property.attributes.state,
                    zip: property.attributes.zip
                }),
                guestCardForm: guestCardFormEl.getHTML(),
                communitySpotlight: (hasVideo) ? JST['src/js/templates/elements/property/communitySpotlight.html']({
                    video_source: property.attributes.video
                }) : '',
                propertyGallery: JST['src/js/templates/elements/property/propertyGallery.html']({
                    images: property.attributes.images
                }),
                propertyManagement: JST['src/js/templates/elements/property/propertyManagement.html']({
                    management_info: ''
                }),
                officeHours: '',
                petPolicy: '',
                isSelect: true
            });
        }
    });

    return new propertyViewEl();
});