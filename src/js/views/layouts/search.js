define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var searchView = Backbone.View.extend({
        el: "#content",

        render: function(){
            this.$el.html(JST['src/js/templates/layouts/search.html']());
            this.$el.attr("class", "search");
        }
    });
    
    return new searchView();
});