define([], function() {
    var guestCardFormEl = Backbone.View.extend({
        formEl: null,
        property: null,

        getHTML: function() {
            var _this = this;
            return JST['src/js/templates/elements/guestCardForm.html']({
                property: _this.property
            });
        },

        init: function(property) {
            this.property = property;
            this.formEl = $(document.getElementById('guestCard'));
            this.formFields = this.formEl.find('input, textarea');
            this.setEvents();
        },

        /**
         * Handle what happens when the form is submitted.
         * Validate data and then submit guest card.
         */
        onFormSubmission: function() {
            if(this.submissionIsValid()) {
                // TODO
            }
        }, 

        setEvents: function() {
            var _this = this;
            this.formEl.submit(function(ev) {
                ev.preventDefault();
                _this.onFormSubmission();
            });

            this.formFields.focus(function() {
                if($(this).hasClass('error')) {
                    $(this).removeClass('error');
                }
            });
        },

        submissionIsValid: function() {
            var noErrors = true;

            this.formFields.each(function() {
                if($(this).val() === '') {
                    noErrors = false;
                    $(this).addClass('error');
                }
            });

            return noErrors;
        }
    });

    return new guestCardFormEl();
});