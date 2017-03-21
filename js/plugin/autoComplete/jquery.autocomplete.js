(function($) {
    var rEscape = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;
    $.widget("custom.combobox", {
        _create: function() {
            this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },
        _createAutocomplete: function() {
            var cssClass = this.element.attr("class");
            if (cssClass === undefined) {
                cssClass = "";
            }
            var placeholder = this.element.attr("placeholder");
            if (placeholder === undefined) {
                placeholder = "";
            }

            var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";
            this.input = $("<input type='text' id='" + this.element.attr("id") + "' name='" + this.element.attr("id") + "'>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .attr("placeholder", placeholder)
                    .addClass(cssClass)
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    });

            this._on(this.input, {
                autocompleteselect: function(event, ui) {
                    ui.item.option.selected = true;
                    this.element.change();
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },
                autocompletechange: "_removeIfInvalid"
            });
        },
        _createShowAllButton: function() {
            var input = this.input,
                    wasOpen = false;

            $("<a>")
                    .attr("tabIndex", -1)
                    .attr("title", "Mostrar opciones")
                    //.tooltip()
                    .appendTo(this.wrapper)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass("ui-corner-all")
                    .addClass("custom-combobox-toggle ui-corner-right")
                    .mousedown(function() {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    })
                    .click(function() {
                        input.focus();

                        // Close if already visible
                        if (wasOpen) {
                            return;
                        }

                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
        },
        _source: function(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function() {

                var inSourceAttr = false;

                var sourceAttr = $(this).attr("sourceText");

                if (sourceAttr !== undefined) {
                    var keys = sourceAttr.split(" ");

                    for (var x = 0; x < keys.length; x++) {
                        var regex = new RegExp(keys[x].replace(rEscape, "\\$&"), 'gi');
                        if (request.term.search(regex) !== -1) {
                            inSourceAttr = true;
                        }
                    }
                }

                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text) || inSourceAttr))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));


        },
        _removeIfInvalid: function(event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
            this.element.children("option").each(function() {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });


            // Found a match, nothing to do
            if (valid) {
                this.element.change();
                return;
            }


            // Remove invalid value
            this.input
                    .val("")
                    .attr("placeholder", "Intenta nuevamente");
            //.tooltip("open");
            this.element.val("");
            this.element.change();
            this._delay(function() {
                //this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.data("ui-autocomplete").term = "";
        },
        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);
