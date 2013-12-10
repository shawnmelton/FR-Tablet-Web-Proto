define(['jquery', 'backbone', 'templates/jst', 'tools/navigate', 'views/elements/advancedSearch'],
    function($, Backbone, tmplts, Navigate, advancedSearchViewEl){
    var searchBarViewEl = Backbone.View.extend({
        parentEl: null,
        keywords: '',
        form: null,
        textfield: null,
        advSearchBtn: null,

        isRenderedToHeader: function() {
            return (this.parentEl !== null && this.parentEl[0] && this.parentEl[0].tagName.toLowerCase() === 'header');
        },

        /**
         * Make sure that keywords entered are valid.
         */
        isValidSubmission: function() {
            return (/[a-z,0-9, ,\,,\',\-]+/i.test(this.textfield.val()));
        },

        /**
         * Handle what happens when the form is submitted.
         */
        onSearchFormSubmission: function() {
            this.textfield.removeClass('error');
            if(this.isValidSubmission()) {
                this.textfield.blur();
                Navigate.toUrl('/search/'+ this.textfield.val());
            } else {
                this.textfield.addClass('error');
            }
        },

        /**
         * Refresh the search bar.  Right now this just updates the keywords.
         */
        refresh: function() {
            if(this.keywords !== '') {
                this.textfield.val(this.keywords);
            }
        },

        /**
         * If this search bar is in the header, remove it.
         * Clean up all of the stored elements.
         */
        removeFromHeader: function() {
            if(this.isRenderedToHeader()) {
                this.textfield = null;
                this.form.remove();
                this.form = null;
                this.parentEl = null;
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

            this.form = $(document.getElementById('searchBar'));
            this.textfield = this.form.find('input');
            this.advSearchBtn = $(document.getElementById('advSearchBtn'));
            this.setEvents();
            this.refresh();
        },

        /**
         * Call this to insert this search bar into the page header.
         */
        renderToHeader: function() {
            if(this.isRenderedToHeader()) {
                this.refresh();
            } else {
                this.parentEl = $('header');
                this.render('');
            }
        },

        /**
         * Call this to insert this search bar into content of the page body.
         */
        renderToContent: function() {
            this.removeFromHeader();
            this.parentEl = $(document.getElementById('content'));
            this.render('<h2>Discover the Perfect Apartment</h2>');
        },

        /**
         * Set the form events for this form.
         */
        setEvents: function() {
            // Submission events
            this.form.unbind('submit');

            var _this = this;
            this.form.submit(function(ev) {
                ev.preventDefault();
                _this.onSearchFormSubmission();
            });

            // Advanced Search Button Event.
            this.advSearchBtn.unbind(touchEventType);
            if(this.isRenderedToHeader()) {
                this.advSearchBtn.bind(touchEventType, function() {
                    advancedSearchViewEl.toggleDrawer();
                });
            }
        },

        /**
         * Populate textfield with keywords from search.
         */
        setKeywords: function(keywords) {
            this.keywords = keywords;
            if(this.textfield !== null) {
                this.refresh();
            }
        }
    });

    return new searchBarViewEl();
});