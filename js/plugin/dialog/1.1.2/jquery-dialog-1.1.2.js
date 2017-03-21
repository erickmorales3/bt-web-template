var idDivDialog = 0;
var divDialogTemplate = $("<div title='' style='display:none;'></div>");
var loadingDialogTemplate = $("<div title='' style='display:none;' class='divLoadingDialog'></div>");
var iFrame = $('<iframe src="" frameborder="0" style="overflow:hidden;height:98%;width:100%" height="98%" width="100%"></iframe>');

$(document).ready(function() {
    $.ui.dialog.prototype.options.autoReposition = true;
//    $(window).resize(function() {
//        $(".ui-dialog-content:visible").each(function() {
//            var dialog = $(this).data("dialog");
//            if (dialog.options.autoReposition) {
//                dialog.option("position", dialog.options.position);
//            }
//        });
//    });

    /*var divDialog = '<div id="dialog" title="" style="display:none;"></div>'
     +'<div id="loadingDialog" title="" style="display:none;"></div>';
     $("body").prepend( divDialog );*/
});

function dialog(title, message, width, height) {
    var idWindow;
    if (message !== "") {
        var msg = "" + message;
        for (var x = 0; x <= msg.length; x++) {
            msg = msg.replace("&lt;", "<");
            msg = msg.replace("&gt;", ">");
            msg = msg.replace("&quot;", "\"");
        }

        var dialogWindow = $(divDialogTemplate).clone();
        idWindow = "dialog" + idDivDialog++;
        dialogWindow.attr("id", idWindow);

        dialogWindow.attr("title", title);
        dialogWindow.html(msg);
        dialogWindow.dialog({
            resizable: false,
            width: width,
            height: height,
            draggable: false,
            modal: true,
            //position: [null,32],
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                }
            }
        });
    }
    return idWindow;
}

function divDialog(title, div, width, height) {
    var idWindow;
    var element = $("#" + div);

    var dialogWindow = $(divDialogTemplate).clone();
    idWindow = "dialog" + idDivDialog++;
    dialogWindow.attr("id", idWindow);

    dialogWindow.attr("title", title);
    dialogWindow.append(element);
    dialogWindow.dialog({
        resizable: false,
        width: width,
        height: height,
        draggable: false,
        modal: true,
        buttons: {
            "OK": function() {
                $(this).dialog("close");
            }
        }
    });
    element.show();
    return idWindow;
}

function loadingDialog(title) {
    var idWindow;
    var dialogWindow = $(loadingDialogTemplate).clone();
    idWindow = "dialog" + idDivDialog++;
    dialogWindow.attr("id", idWindow);

    dialogWindow.attr("title", title);
    dialogWindow.html("<div class='loadingDialog'></div>");
    dialogWindow.dialog({
        resizable: false,
        width: 245,
        height: 73,
        modal: true,
        //closeOnEscape: false,
        draggable: false,
        dialogClass: 'no-close'
    });
    return idWindow;
}

function closeDialog(id) {
    $("#" + id).dialog("close");
}

function redirectDialog(title, message, width, height, url) {
    var idWindow;
    if (message !== "") {
        var msg = "" + message;
        for (var x = 0; x <= msg.length; x++) {
            msg = msg.replace("&lt;", "<");
            msg = msg.replace("&gt;", ">");
            msg = msg.replace("&quot;", "\"");
        }

        var dialogWindow = $(divDialogTemplate).clone();
        idWindow = "dialog" + idDivDialog++;
        dialogWindow.attr("id", idWindow);

        dialogWindow.attr("title", title);
        dialogWindow.html(msg);
        dialogWindow.dialog({
            resizable: false,
            width: width,
            height: height,
            modal: true,
            dialogClass: 'no-close',
            closeOnEscape: false,
            draggable: false,
            buttons: {
                "OK": function() {
                    window.location.replace(url);
                }
            }
        });
    }
    return idWindow;
}

function confirmDialog(title, message, width, height, okFunction, cancelFunction) {
    var idWindow;
    if (message !== "") {
        var msg = "" + message;
        for (var x = 0; x <= msg.length; x++) {
            msg = msg.replace("&lt;", "<");
            msg = msg.replace("&gt;", ">");
            msg = msg.replace("&quot;", "\"");
        }

        var dialogWindow = $(divDialogTemplate).clone();
        idWindow = "dialog" + idDivDialog++;
        dialogWindow.attr("id", idWindow);

        dialogWindow.attr("title", title);
        dialogWindow.html(msg);
        dialogWindow.dialog({
            resizable: false,
            width: width,
            height: height,
            modal: true,
            dialogClass: 'no-close',
            closeOnEscape: false,
            draggable: false,
            buttons: {
                "Si": function() {
                    if (okFunction !== null && okFunction !== "" && okFunction !== undefined) {
                        if (okFunction.search("[()]") === -1) {
                            okFunction += "()";
                        }
                        eval(okFunction);
                    }
                    $(this).dialog("close");
                },
                "No": function() {
                    if (cancelFunction !== null && cancelFunction !== "" && cancelFunction !== undefined) {
                        if (cancelFunction.search("[()]") === -1) {
                            cancelFunction += "()";
                        }
                        eval(cancelFunction);
                    }
                    $(this).dialog("close");
                }
            }
        });
    }
    return idWindow;
}

function formDialog(title, form, width, height, submitFunction) {
    var idWindow;
    var formElement = $("#" + form);

    var dialogWindow = $(divDialogTemplate).clone();
    idWindow = "dialog" + idDivDialog++;
    dialogWindow.attr("id", idWindow);

    dialogWindow.attr("title", title);
    dialogWindow.append(formElement);
    dialogWindow.dialog({
        resizable: false,
        width: width,
        height: height,
        draggable: false,
        modal: true,
        buttons: {
            "OK": function() {
                if (submitFunction !== null && submitFunction !== "" && submitFunction !== undefined) {
                    if (submitFunction.search("[()]") === -1) {
                        submitFunction += "()";
                    }
                    eval(submitFunction);
                } else {
                    $("#" + form).submit();
                }
                $(this).dialog("close");
            },
            "Cancelar": function() {
                $(this).dialog("close");
            }
        }
    });
    formElement.show();
    return idWindow;
}

function frameDialog(title, url, width, height) {
    var idWindow;
    if (url !== "") {
        var dialogWindow = $(divDialogTemplate).clone();
        idWindow = "dialog" + idDivDialog++;
        dialogWindow.attr("id", idWindow);
        
        var frame = $(iFrame).clone();
        $(frame).attr("src",url);

        dialogWindow.attr("title", title);
        dialogWindow.append(frame);
        dialogWindow.dialog({
            resizable: false,
            width: width,
            height: height,
            draggable: false,
            modal: true,
            //position: [null,32],
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                }
            }
        });
    }
    return idWindow;
}


//Old versions
function simpleDialog(title, message, width, height) {
    return dialog(title, message, width, height);
}

function simpleDivDialog(title, div, width, height) {
    return divDialog(title, div, width, height);
}

function simpleRedirectDialog(title, message, width, height, url) {
    return redirectDialog(title, message, width, height, url);
}

function closeLoadingDialog(){
    $(".divLoadingDialog").dialog().dialog("close");
}