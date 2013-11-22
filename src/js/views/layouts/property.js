define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var propertyView = Backbone.View.extend({
        el: "#content",

        render: function(){
            this.$el.html(JST['src/js/templates/layouts/property.html']());
            this.$el.attr("class", "property");
        }
    });
    
    return new propertyView();
});