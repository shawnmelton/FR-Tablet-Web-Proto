define(['jquery', 'backbone', 'templates/jst'],
    function($, Backbone, tmplts){
    var searchBarViewEl = Backbone.View.extend({
        parentEl: null,
        keywords: '',
        form: null,
        textfield: null,

        events: {
            'click #searchBar > button': 'onSearchButtonClick',
            'submit #searchBar': 'onSearchFormSubmission'
        },

        /**
         * Make sure that keywords entered are valid.
         */
        isValidSubmission: function() {
            return (this.textfield.val() !== '');
        },

        /**
         * Catch the form submission event.
         * 
         */
        onSearchButtonClick: function(event) {
            event.preventDefault();
            this.onSearchFormSubmission(null);
        },

        /**
         * Reload search events based on search
         */
        onSearchFormSubmission: function(event) {
            if(event !== null) {
                event.preventDefault();
            }

            this.textfield.removeClass('error');
            if(this.isValidSubmission()) {
                // TODO - Reload results.
            } else {
                this.textfield.addClass('error');
            }
        },

        /**
         * If this search bar is in the header, remove it.
         */
        removeFromHeader: function() {
            if(this.el === 'header') {
                this.$el.find('form').remove();
                this.el = null;
            }
        },

        /**
         * Make sure that this method is called after el has been set.
         */
        render: function(heading) {
            this.parentEl.append(JST['src/js/templates/elements/searchBar.html']({
                keywords: this.keywords,
                heading: heading
            }));

            this.form = $('#searchBar');
            this.textfield = $('#searchBar > input');
        },

        /**
         * Call this to insert this search bar into the page header.
         */
        renderToHeader: function() {
            this.parentEl = $('header');
            this.render('');
        },

        /**
         * Call this to insert this search bar into content of the page body.
         */
        renderToContent: function() {
            this.removeFromHeader();
            this.parentEl = $('#content');
            this.render('<h2>Discover the Perfect Apartment</h2>');
        }
    });

    return new searchBarViewEl();
});