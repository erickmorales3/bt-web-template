// JScript File

//Funcion para eliminar espacios al principio y al final de una cadena
function Trim(s) {
    while (s.substring(0, 1) == ' ') {
        s = s.substring(1, s.length);
    }
    while (s.substring(s.length - 1, s.length) == ' ') {
        s = s.substring(0, s.length - 1);
    }
    return s;
}
//==========================================================================================================

//Funcion para contar caracteres en un textbox
function CharCount(TextBox, Visor, Limit) {
    letras = document.getElementById(TextBox).value.length;
    document.getElementById(Visor).value = Limit - letras;
    if (letras > Limit) {
        document.getElementById(TextBox).value = document.getElementById(TextBox).value.substring(0, Limit);
        document.getElementById(Visor).value = 0;
    }
}

//==========================================================================================================

// Funcion para validar tipo de captura
function ValidKeyPress(tipo) {
    /*Utilizado para la captura de los campos de usuario y password*/
    if (tipo == "usuario") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 46 && event.keyCode != 209 && event.keyCode != 241 && event.keycode != 95)
            event.returnValue = false;
    }
    /*Permite capturar casi todos los signos, así como también acentos*/
    if (tipo == "textarea") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 32 && event.keyCode != 40 && event.keyCode != 41 && event.keyCode != 44 && event.keyCode != 45 && event.keyCode != 46 && event.keyCode != 59 && event.keyCode != 95 && event.keyCode != 193 && event.keyCode != 201 && event.keyCode != 205 && event.keyCode != 209 && event.keyCode != 211 && event.keyCode != 218 && event.keyCode != 225 && event.keyCode != 233 && event.keyCode != 237 && event.keyCode != 241 && event.keyCode != 243 && event.keyCode != 250 && event.keyCode != 64 && event.keyCode != 191 && event.keyCode != 63 && event.keyCode != 61)
            event.returnValue = false;
    }
    if (tipo == "tsangre") {
        if (((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 43 && event.keyCode != 45)
            event.returnValue = false;
    }
    /*Utilizado para la captura de los campos de nombre, paterno, materno, ya que no permite capturar acentos*/
    if (tipo == "nombres") {
        if (((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 32 && event.keyCode != 241 && event.keyCode != 209 && event.keyCode != 46)
            event.returnValue = false;
    }
    /*Captura todas las letras, incluyendo acentos*/
    if (tipo == "texto") {
        if (((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 32 && event.keyCode != 38 && event.keyCode != 241 && event.keyCode != 209 && event.keyCode != 46 && event.keyCode != 193 && event.keyCode != 201 && event.keyCode != 205 && event.keyCode != 211 && event.keyCode != 218 && event.keyCode != 225 && event.keyCode != 233 && event.keyCode != 38 && event.keyCode != 237 && event.keyCode != 243 && event.keyCode != 250)
            event.returnValue = false;
    }
    /*Captura todos los caracteres del domicilio*/
    if (tipo == "domicilio") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 122)) && event.keyCode != 32 && event.keyCode != 241 && event.keyCode != 209 && event.keyCode != 46)
            event.returnValue = false;
    }
    /*Exclusivamente números*/
    if (tipo == "numerico") {
        if ((event.keyCode < 48) || (event.keyCode > 57))
            event.returnValue = false;
    }
    /*Exclusivamente números y asterisco*/
    if (tipo == "IdNext") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && event.keyCode != 42)
            event.returnValue = false;
    }
    /*Exclusivamente números y diagonales "/"*/
    if (tipo == "fecha") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && event.keyCode != 47)
            event.returnValue = false;
    }
    /*Numeros, letras, arroba y punto*/
    if (tipo == "email") {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) && event.keyCode != 31 && event.keyCode != 45 && event.keyCode != 46 && event.keyCode != 64 && event.keyCode != 95 && event.keyCode != 209 && event.keyCode != 241)
            event.returnValue = false;
    }
    /*Numeros, letras, dos puntos, punto y diagonal*/
    if (tipo == "url") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && event.keyCode != 45 && event.keyCode != 46 && event.keyCode != 47 && event.keyCode != 58 && event.keyCode != 95)
            event.returnValue = false;
    }
    /*Números con espacio*/
    if (tipo == "numericoespacio") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && event.keyCode != 32)//46
            event.returnValue = false;
    }
    
    /*Números y letras SIN espacio*/
    if (tipo == "rfc") {
        if ( (event.keyCode != 38) && ((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)) && (event.keyCode != 241) && (event.keyCode != 209))
            event.returnValue = false;
    }
    
    /*Números y letras SIN espacio*/
    if (tipo == "alfanumerico") {
        if (((event.keyCode < 48) || (event.keyCode > 57)) && ((event.keyCode < 65) || (event.keyCode > 90)) && ((event.keyCode < 97) || (event.keyCode > 122)))
            event.returnValue = false;
    }
    
    /*Ningún caracter*/
    if (tipo == "blocktext") {
        if ((event.keyCode > 0) || (event.keyCode < 200))
            event.returnValue = false;
    }

    //Numerico y punto
    if (tipo == "numericoYpunto") {
        if ((event.keyCode < 46) || (event.keyCode > 57))
            event.returnValue = false;
    }

    //Numerico y coma
    if (tipo == "numericoYcoma") {
        if (((event.keyCode < 48) || (event.keyCode > 57))  && event.keyCode != 44)
            event.returnValue = false;
    }

    /*Utilizado para la captura de los campos de Hora(Solo numeros y :) */
    if (tipo == "hora") {
        if ((event.keyCode < 48) || (event.keyCode > 58))
            event.returnValue = false;
    }
} //FIN VALIDKEYPRESS
//=================================================================================================================

