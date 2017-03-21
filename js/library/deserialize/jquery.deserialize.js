(function(jQuery) {
    jQuery.fn.deserialize = function(data) {
        var f = jQuery(this), map = {};
        //Get map of values
        jQuery.each(data.split("&"), function() {
            var nv = this.split("="),
                    n = decodeURIComponent(nv[0]),
                    v = nv.length > 1 ? decodeURIComponent(nv[1]) : null;
            if (!(n in map)) {
                map[n] = [];
            }
            map[n].push(v);
        })
        //Set values for all form elements in the data
        jQuery.each(map, function(n, v) {
            f.find("[name='" + n + "']").val(v);
        });
        //Uncheck checkboxes and radio buttons not in the form data
        jQuery("input:checkbox:checked,input:radio:checked").each(function() {
            if (!($(this).attr("name") in map)) {
                this.checked = false;
            }
        });

        return this;
    };
})(jQuery);

function deserializeData(form, dat) {
    $("#" + form).deserialize(dat);


}

function preselectMultiSelect(select, dat) {
    //alert(dat.length);
    var values = dat.split(",");

    $("#" + select + " option").each(function() {
        for (var i = 0; i < values.length; i++) {
            if ($(this).attr("value") === values[i]) {
                $(this).attr("selected", "selected");
            }
        }

    });
}

function preselectAllMultiSelect(select) {
    //alert(dat.length);

    $("#" + select + " option").each(function() {
        $(this).attr("selected", "selected");
    });
}

function preselectCheckbox(form, name, value) {
    //alert(dat.length);
    var element = new Object();
    $("#" + form + " input[type=checkbox]").each(function() {
        if ($(this).attr("name") === name && $(this).attr("value") === value) {
            $(this).attr("checked", "checked");
            element = $(this);
        }

    });
    return element;
}