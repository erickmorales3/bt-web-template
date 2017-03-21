
$(document).ready(function() {

    $(document).click(function() {
        $("#divUOptions").fadeOut("fast");
        $(".mainMenu ul").fadeOut("fast");
        $(".sideResponsiveMenu").hide("fast");
    });

    //User options
    $(".userOptions").click(function(event) {
        $("#divUOptions").toggle();
        event.stopPropagation();
    });

    $("#divUOptions").click(function(event) {
        event.stopPropagation();
    });

    // == Responsive menu ==

    //Top menu
    var topMenuSelect = $("<select class='responsiveTopMenu'><option>...</option></select>");
    $(".topMenu").find("li a").each(function(index, element) {
        var option = $("<option value='" + $(element).attr("href") + "'>" + $(element).text() + "</option>");
        topMenuSelect.append(option);
    });

    $(".topMenu").after(topMenuSelect);

    $(topMenuSelect).on("change", function(element) {
        window.open($(this).val(), "_blank");
    });

    //Main menu
    var mainMenuSelect = $("<select class='responsiveMainMenu'><option>Men&uacute;</option></select>");
    $(".mainMenu").find("> li").each(function(index, element) {

        var option = $("<option value='" + $(element).find("> a").attr("href") + "'>" + $(element).find("> a").text() + "</option>");
        mainMenuSelect.append(option);

        $(element).find("> ul").each(function(ind, elem) {

            $(elem).find("> li").each(function(ind2, elem2) {
                var opt = $("<option value='" + $(elem2).find("> a").attr("href") + "'> - - " + $(elem2).find("> a").text() + "</option>");
                mainMenuSelect.append(opt);

                $(elem2).find("> ul").each(function(ind3, elem3) {

                    $(elem3).find("> li").each(function(ind4, elem4) {
                        var opt = $("<option value='" + $(elem4).find("a").attr("href") + "'> - - - - " + $(elem4).find("a").text() + "</option>");
                        mainMenuSelect.append(opt);
                    });
                });

            });

        });

    });


    //Side menu
    var sideIcon = $("<div></div>");


    sideIcon.css({
        background: "#fff",
        paddingTop: "0px",
        position: "relative",
        display: "none"
    });

    $(".content").prepend(sideIcon);

    var menuContent = $("<div></div>");

    $("aside .nav").each(function(index, element) {
        //$(element).hide();
//        alert("side");
        var menu = $("<div style='display:none; position: relative;' class='sideResponsiveMenu'></div>");

        $(menu).append($(element).find("ul").clone());

        menu.attr("id", "srm" + index);

        var icon = $("<img src='images/mobile-menu-icon.png'  border='none'/>");

        if (index === 1) {
            icon.css({
                position: "absolute",
                right: "5px"
            });


            $(icon).click(function(event) {
                $("#srm0").hide("fast");
                menu.toggle("slide", {direction: 'right'}, "slow");
                //$('#hello').hide('slide', {direction: 'left'}, 1000)
                event.stopPropagation();
            });

        } else {

            $(icon).click(function(event) {
                $("#srm1").hide("fast");
                //menu.toggle("slow");
                menu.toggle("slide", {direction: 'left'}, "slow");
                event.stopPropagation();
            });
        }



        sideIcon.append(icon);
        menuContent.append(menu);

    });

    sideIcon.append(menuContent);



    //Adjust heigth 100%
    var height = $(window).height() - 248;
    $(".mainContent").attr("style", "min-height: " + height + "px;");

    $(".mainMenu").after(mainMenuSelect);

    $(mainMenuSelect).on("change", function(element) {
        window.location = ($(this).val());
    });

    //MainMenu submenu
    $(".mainMenu a").on("click", function() {
        if ($(this).attr("href") === "#") {
            return false;
        }
    });

    $(".mainMenu").find("> li").each(function(index, element) {
        var countUl = $(element).find("> ul").length;

        if (countUl > 0) {
            var text = $(element).find("> a").text();

            $(element).find("> a").html(text + '<span class="ui-icon ui-icon-white ui-icon-triangle-1-s caretIcon"></span>');

            $(element).on("click", function(event) {
                $(".mainMenu").find("> li ul").not($(element).find("ul")).hide();
                $(element).find("> ul").fadeIn("fast");
                event.stopPropagation();

            });


            $(element).hover(
                    function() {
                        $(this).find("> ul").fadeIn("fast");
                    },
                    function() {
                        $(this).find("> ul").fadeOut("fast");
                    }
            );

        }

        $(element).find("> ul").each(function(ind, elem) {

            var maxWidth = 0;
            $(elem).find("> li").each(function(ind2, elem2) {

                var text = $(elem2).find("> a").text();

                var width = $('<span></span>').css({
                    display: 'none', whiteSpace: 'nowrap'
                }).appendTo($('body')).text(text).width();

                if (width > maxWidth) {
                    maxWidth = width;
                }

                var countUl = $(elem2).find("> ul").length;

                if (countUl > 0) {

                    $(elem2).find("> a").html(text + '<span class="ui-icon ui-icon-white ui-icon-triangle-1-e caretIcon"></span>');

                    $(elem2).on("click", function(event) {
                        $(elem2).find("> ul").fadeIn("fast");
                        event.stopPropagation();
                    });

                    $(elem2).hover(
                            function() {
                                $(this).find("> ul").fadeIn("fast");
                            },
                            function() {
                                $(this).find("> ul").fadeOut("fast");
                            }
                    );

                }

                var maxWidth2 = 0;
                $(elem2).find("> ul").each(function(ind3, elem3) {

                    $(elem3).find("> li").each(function(ind4, elem4) {
                        var text = $(elem4).find("> a").text();

                        var width2 = $('<span></span>').css({
                            display: 'none', whiteSpace: 'nowrap'
                        }).appendTo($('body')).text(text).width();

                        if (width2 > maxWidth2) {
                            maxWidth2 = width2;
                        }
                    });
                    $(elem3).attr("style", "width: " + (maxWidth2 + 30) + "px!important;");

                });




            });
            if (maxWidth > $(element).width()) {
                $(elem).attr("style", "width: " + (maxWidth + 30) + "px!important;");
            }



        });

    });



    //Floating fixed menu
    fixMenu();

    //FLoating fixed aside
    fixAside();

    function fixMenu() {
        if (filterDevices()) {
            $(".mainNav").scrollToFixed({
                zIndex: 900
            });
        }
    }

    function fixAside() {
        if (filterDevices()) {
            $(".aside").scrollToFixed({
                marginTop: 30,
                zIndex: 800,
                //limit: $('.footer').offset().bottom
            });
        }
    }


    function fixSideMenu() {
        if (filterDevices()) {
            $(sideIcon).scrollToFixed({
                zIndex: 899,
                marginTop: 30,
                preFixed: function() {
                    $(sideIcon).css({
                        width: "100%",
                        display:"block"
                    });
                },
                postFixed: function() {
                    $(sideIcon).css({
                        width: "100%",
                        display:"block"
                    });
                }
            });
        }
    }


    function filterDevices() {
        var device = true;

        if (jQuery.browser.mobile) {
            device = false;
        } else if (/ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase())) {
            device = false;
        } else if (/android/i.test(navigator.userAgent.toLowerCase())) {
            device = false;
        } else if (/blackberry/i.test(navigator.userAgent.toLowerCase())) {
            device = false;
        } else if (/webos/i.test(navigator.userAgent.toLowerCase())) {
            device = false;
        } else if (/windows phone/i.test(navigator.userAgent.toLowerCase())) {
            device = false;
        }

        return device;
    }


    // Window size
    function jqUpdateSize() {
        // Get the dimensions of the viewport
        var width = $(window).width();
        var height = $(window).height();

        if (width <= 706) {
            var sides = $(".aside");
            $(".mainContent").after(sides);
            $('.aside').trigger('detach.ScrollToFixed');
            fixSideMenu();
            sideIcon.show();

            $("aside .nav").each(function(index, element) {
                $(element).hide();
            });

        } else {
            $('.aside').trigger('detach.ScrollToFixed');
            $('.mainNav').trigger('detach.ScrollToFixed');

            $(sideIcon).trigger('detach.ScrollToFixed');

            $(".fixDiv").each(function(index, elem) {
                $(elem).remove();
            });

            var content = $("<div></div>");

            var sides = $(".page").find(".aside");
            
            var left = undefined;
            var right = undefined;
            
            $.each(sides, function(i, e){
                if($(e).hasClass("leftSide")){
                    left = e;
                } else if($(e).hasClass("rightSide")){
                    right = e;
                }
            });

            var main = $(".mainContent");

            content.append(left);
            content.append(main);

            if (right !== undefined) {
                content.append(right);
            }

            $(".footerBar").before(content);

            fixAside();

            fixMenu();

            sideIcon.hide();

            $("aside .nav").each(function(index, element) {
                $(element).show();
            });
        }
    }
    
    responsiveTables();
    
    function responsiveTables(){
        $("table").each(function(index, element){
            var rTable= $("<div class='responsiveTable'></div>");
            $(element).after(rTable);
            rTable.append(element);
        });
    }



    $(document).ready(jqUpdateSize);    // When the page first loads
    $(window).resize(jqUpdateSize);     // When the browser changes size



    // == Widgets == 

    //Slidershow
    $(".bxslider").each(function() {
        makeSliderShow($(this));
    });

    //Datatable
    $(".dataTable").each(function() {
        makeDataTable($(this));
    });

    //Mask data
    $('.dateMask').mask('00/00/0000');
    $('.timeMask').mask('00:00:00');
    $('.date_timeMask').mask('00/00/0000 00:00:00');
    $('.cepMask').mask('00000-000');
    $('.phoneMask').mask('0000-0000');
    $('.phone_with_dddMask').mask('(00) 0000-0000');
    $('.phone_usMask').mask('(000) 000-0000');
    $('.mixedMask').mask('AAA 000-S0S');
    $('.cpfMask').mask('000.000.000-00', {reverse: true});
    $('.moneyMask').mask('$000,000,000,000,000.00', {reverse: false});
    $('.numberMask').mask('000,000,000,000,000.00', {reverse: true});
    $('.numberMask2').mask("#.##0,00", {reverse: true, maxlength: false});
    $('.ip_addressMask').mask('0ZZ.0ZZ.0ZZ.0ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});
    $('.ip_addressMask').mask('099.099.099.099');
    $('.percentMask').mask('##0.00%', {reverse: true});

    //Field validations
    $("body").on("keypress", "input,textarea", function() {
        var validate = $(this).attr("validate");
        if (validate !== undefined) {
            ValidKeyPress(validate);
        }
    });


    //Autocomplete combobox
    $(".autoCompleteSelect").each(function() {
        $(this).combobox();
    });

    //Dates
    $(".datePicker").each(function() {
        makeDatePicker($(this));
    });

    //Select
    $(".select").each(function() {
        makeSelect($(this));
    });


    //Multiselect
    $(".multiselect").each(function() {
        makeMultiSelect($(this));
    });

    //Grails 
    $("select[class='many-to-one']").each(function() {
        makeMultiSelect($(this));
    });


    //JQuery UI
    $(".accordion").accordion({
        heightStyle: "content"
    });

    $(".tabs").tabs();

    $(".tooltip").each(function() {
        makeTooltip($(this));
    });

    $(".slider").each(function() {
        makeSliderBar($(this));
    });

    $(".progressbar").each(function() {
        makeProgressBar($(this));
    });


    $(".unmaskSubmit").each(function(){
        var input = $(this);
        var parentForm = $(input).parents("form");
        if(parentForm !== undefined){
            $(parentForm).submit(function(){
                $(input).unmask();
            });
        }
        
    });


});

function makeDataTable(element) {
    $(element).dataTable({
        "oLanguage": {
            "sLengthMenu": "Mostrar _MENU_ registros por pagina",
            "sZeroRecords": "No se encontraron datos",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando del 0 al 0 de 0 registros",
            "sInfoFiltered": "(Buscando registros)",
            "sSearch": "Buscar",
            "oPaginate": {
                "sNext": "Siguiente >",
                "sPrevious": "< Anterior",
                "sFirst": "Primera",
                "sLast": "Ultima"
            }
        },
        "iDisplayLength": 25,
        //"bStateSave": true,
        "sPaginationType": "full_numbers",
        "bJQueryUI": false,
        "sDom": '<"top"lfip>rt<"bottom"ip<"clear">'
    });
}

function makeDatePicker(element) {
    $(element).datepicker({
        //yearRange: '1950:2000',
        showOn: "button",
        changeYear: true,
        changeMonth: true,
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Juv', 'Vie', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });
}

function makeSelect(element) {
    $(element).multiselect({
        multiple: false,
        noneSelectedText: "Selecciona...",
        selectedList: 1
    }).multiselectfilter({
        label: "Buscar: ",
        placeholder: "Palabras clave"
    });
}

function makeMultiSelect(element) {
    $(element).multiselect({
        multiple: true,
        header: true,
        noneSelectedText: "Selecciona...",
        selectedText: "# de # seleccionados",
        checkAllText: "Todos",
        uncheckAllText: "Desseleccionar",
        selectedList: 1 // 0-based index
    }).multiselectfilter({
        label: "Buscar: ",
        placeholder: "Palabras clave"
    });
}

function makeSliderShow(element) {
    var type = $(element).attr("type");
    if (type === undefined) {
        type = "image";
    }
    if (type === "image") {
        $(element).bxSlider({
            auto: true,
            autoControls: true
        });
    }

    if (type === "content") {
        $(element).bxSlider({
            nextSelector: '#none',
            prevSelector: '#none',
            auto: true,
            autoControls: false
        });
    }
}

function makeTooltip(element) {
    $(element).tooltip({
        show: {
            effect: "slideDown"
        }
    });
}

function makeSliderBar(element) {
    var value = parseInt($(element).attr("val"));
    var max = parseInt($(element).attr("max"));
    var min = parseInt($(element).attr("min"));
    var step = parseInt($(element).attr("step"));
    var inputId = $(element).attr("inputId");
    if (value === undefined) {
        value = 1;
    }
    if (max === undefined) {
        max = 100;
    }
    if (min === undefined) {
        min = 0;
    }
    if (step === undefined) {
        step = 1;
    }
    $(element).slider({
        range: "min",
        value: value,
        min: min,
        max: max,
        step: step,
        slide: function(event, ui) {
            $("#" + inputId).val(ui.value);
        }
    });
    $("#" + inputId).val($(element).slider("value"));
}

function makeProgressBar(element) {
    var val = $(element).attr("val");
    if (val === undefined) {
        val = "1";
    } else {
        if (val === "false") {
            $(element).progressbar({
                value: false
            });
        } else {
            $(element).progressbar({
                value: parseInt(val)
            });
        }
    }
}




