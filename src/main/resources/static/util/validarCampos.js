function validaCamposObrigatorios(campos) {
    var isValid = true;
    if (!verificaCamposVazios(campos)) {
        alerta("Favor preencher os campos obrigatórios.", "warning");
        isValid = false;
    }
    return isValid;
}

//Habilitar botao caso tenta todos os inputs com valores.
function verificaCamposVazios(campos) {
    var i;
    for (i = 0; i < campos.length; i++) {
        if ($(campos[i]).val() === '') {
            $(campos[i]).css('border-color', 'red');
            return false;
        }else{
            $(campos[i]).css('border-color', '#d2d6de');
        }
    }
    return true;
}