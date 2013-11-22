define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var homeView = Backbone.View.extend({
        el: "#content",

        render: function(){
            this.$el.html(JST['src/js/templates/layouts/home.html']());
        }
    });
    
    return new homeView();
});