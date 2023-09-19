

function clearAll(escopo) {
    if (escopo == undefined) escopo = "";
    $(escopo + " :text").each(function () {
        $(this).val("");
    });

    $(escopo + " textarea").each(function () {
        $(this).val("");
    });

    $(escopo + " input[type=date]").each(function () {
        $(this).val("");
    });

    $(escopo + " input[type=number]").each(function () {
        $(this).val("");
    });

    $(escopo + " input[type=number]").each(function () {
        $(this).val("");
    });

    $(escopo + " :radio").each(function () {
        $(this).prop({checked: false})
    });

    $(escopo + " select").each(function () {
        $(this).children("option:selected").removeAttr("selected").end()
            .children("option:first").attr("selected", "selected");
    });
}

function disableAll() {

    $(":text").each(function () {
        $(this).attr("disabled", true);
    });

    $(":radio").each(function () {
        $(this).attr("disabled", true);
    });

    $("select").each(function () {
        $(this).attr("disabled", true);
    });

    $("#btnSalvar").hide();
}


function hasInformation(escopo) {
    var hasValue = false;
    $(escopo + " input[type=text]").each(function () {
        if ($(this).val() !== "")
            hasValue = true;
    });
    return hasValue;
}

function isValidRequired() {
    clearRequired();
    var isValid = true;
    $(".req > input").each(function () {
        if ($(this).val() === "")
            isValid = setRequired($(this).parent());
    });

    return isValid;
}

function isValidSelectRequired() {
    clearRequired();
    var isValid = true;
    $(".req > select").each(function () {
        if ($(this).val() == "-1")
            isValid = setRequired($(this).parent());
    });

    return isValid;
}

function formatarData(data) {
    if (typeof data == 'undefined')
        return "";
    var date = new Date(data);
    var n = date.toLocaleDateString();
    var t = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    return n + " " + t;

}

function isNumeric(num) {
    var result = true;
    var array = num.split(',');

    if (array.length <= 0)
        return $.isNumeric(num);

    $.each(array, function (i, val) {
        result = result && $.isNumeric($.trim(val));
    });
    return result;
}

function clearRequired() {
    $(".has-error").removeClass("has-error");
}

function setRequired(div) {
    $(div).addClass("has-error");
    return false;
}


function refreshDisabled() {
    $("input").each(function () {
        $(this).attr("readonly", false);
    });
    $(".disabled").each(function () {
        $(this).attr("readonly", true);
    });
}

function alerta(msg, type) {
    humane.log(msg, {baseCls: 'humane-jackedup', addnCls: 'humane-jackedup-' + type});
}

function isEmpty(value) {
    value = $.trim($(value).val());
    return (!value ? true : false);
}

function addRequired(div) {
    $(div).attr("class", "form-group has-error");
    return false;
}

function getEmptyValidation() {
    var qtd = arguments.length;
    var isValid = true;
    for (var i = 0; i < qtd; i++) {
        var div = arguments[i];
        if (isEmpty("#".concat($(div.concat(" > input")).attr("id"))))
            isValid = addRequired(div);
    }
    return isValid;
}

// validação cpf
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito 
    var add = 0;
    var rev;
    for (var i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function validaCNPJCPF(numDocumento) {
    numDocumento = numDocumento.replace(/\D/g, "");
    return numDocumento.length < 14 ? validarCPF(numDocumento) : validarCNPJ(numDocumento);
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;

    //if (cnpj.length != 14 || cnpj.length != 11)
    //    return false;
    alert('1');

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    alert('2');
    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    alert('3');
    if (resultado != digitos.charAt(1))
        return false;
    alert('4');
    return true;
}

function FormatarCnpjCPF(numDocumento) {
    numDocumento = numDocumento.replace(/\D/g, ""); //Remove tudo o que não é dígito

    if (numDocumento.length < 14) {//CPF
        numDocumento = numDocumento.replace(/(\d{3})(\d)/, "$1.$2")  //Coloca um ponto entre o terceiro e o quarto dígitos
        numDocumento = numDocumento.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        numDocumento = numDocumento.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos

    } else {//CPNPJ

        numDocumento = numDocumento.replace(/^(\d{2})(\d)/, "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
        numDocumento = numDocumento.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
        numDocumento = numDocumento.replace(/\.(\d{3})(\d)/, ".$1/$2"); //Coloca uma barra entre o oitavo e o nono dígitos
        numDocumento = numDocumento.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
    }
    return numDocumento;
}

function validaEmail(email) {
    var validar = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!validar.test(email))
        return false;
    return true;
}

function FormatarRg(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    return v;
}

function go(destino) {
    if (destino.indexOf("#") > -1)
        $(destino).submit();
    else
        window.location = destino;
}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

function pad(str, length) {
    const resto = length - String(str).length;
    return '0'.repeat(resto > 0 ? resto : '0') + str;
}

function getRadioButton(radioChecked) {
    var tamanho = radioChecked.length;
    for (var i = 0; i < tamanho; i++) {
        if (radioChecked[i].checked) {
            return radioChecked;
        }
    }
}

function controlTabs(tab) {
    $(".nav-tabs li").each(function () {
        $(this).removeClass("active");
    });

    $(tab).parent().addClass("active");
    $("#content-tabs > div").attr("hidden", true);
    $("#" + $(tab).attr("contextmenu")).attr("hidden", false);
}

function onRemoveLine(idLine, contador) {
    var cont = parseInt($("#".concat(contador)).text());
    $("#".concat(idLine)).parent().parent("tr").remove();
    $("#".concat(contador)).text(parseInt(--cont));
}

function addContador(contador) {
    var cont = parseInt($(contador).text());
    $(contador).html(++cont);
}

function reindex(tabela, nomeObjeto) {
    var cont = 0, name, nomeCampo = "";
    $(tabela + " tr").each(function () {
        $(this).children().children("input").each(function () {
            name = $(this).attr("name");
            nomeCampo = name.substring(name.lastIndexOf("]") + 1, name.length);
            name = nomeObjeto.concat("[", cont, "]", nomeCampo);
            $(this).attr("name", name);
            $(this).attr("id", nomeObjeto.concat(cont, nomeCampo));
        });

        cont++;
    });
}

function isExist(tabBody, nomeID, id) {
    var existente = false, inputHidden;
    $("#" + tabBody + " tr").each(function () {
        inputHidden = $(this).find('input[type=hidden]');
        if (inputHidden.attr("id").indexOf(nomeID) > -1) {
            if (inputHidden.val() == id)
                existente = true;
        }
    });
    return existente;
}

function onClickLineModal(tBody, id) {
    $("#".concat(tBody, " tr")).each(function () {
        $(this).removeClass($("#theme").val());
        if ($(this).children().html() == id) {
            $(this).addClass($("#theme").val());
            return;
        }
    });
}

function getValueLineModal(tBody) {
    var data;
    $(tBody.concat(" tr")).each(function () {
        if ($(this).hasClass($("#theme").val())) {
            data = {
                id: $(this).find('td[data-id]').text(),
                nome: $(this).find('td[data-nome]').text()
            }
            return;
        }
    });
    return data;
}

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

function emptyTable(escopo) {
    $(escopo.concat(" tbody")).remove();
}

function formatNum(val) {
    return val.toPrecision(3);
}

function loadDataTable(obj) {
    $(obj).DataTable({
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
        }
    });
}

//inicialização Datatable
function datatable(obj) {
    $(obj).DataTable({
        fixedHeader: {
            header: true,
            footer: false
        },
        'paging': true,
        'searching': false,
        'lengthMenu': [10, 25, 50, 75, 100, 1000],
        'ordering': true,
        'info': true,
        'autoWidth': false,
        'aLengthMenu': [[10, 25, 50, 100, 250, 500, 1000], [10, 25, 50, 100, 250, 500, 1000]],
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

//inicialização Datatable
function datatableComLimite10(obj) {
    $(obj).DataTable({
        fixedHeader: {
            header: true,
            footer: false
        },
        'paging': true,
        'searching': false,
        'ordering': true,
        'iDisplayLength': 10,
        'info': true,
        'autoWidth': false,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

//inicialização Datatable
function datatableComImprimir(obj) {
    return $(obj).DataTable({
        fixedHeader: {
            header: true,
            footer: false
        },
        lengthMenu: [10, 25, 50, 75, 100, 1000],
        paging: true,
        lengthChange: true,
        iDisplayLength: 10,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        scrollX: true,
        scrollY: true,
        dom: "<'row'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [{'extend': 'print', 'text': 'Imprimir Dados', 'className': 'btn btn-default'}],
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "order": [[1, 'desc']],
        "columnDefs": [{"targets": [0], "searchable": false, "orderable": false, "visible": true}]
    });
}

//inicialização Datatable
function datatableComImprimirOrdenarDataColunaNove(obj) {
    moment.locale('pt-br');
    $.fn.dataTable.moment('DD/MM/YYYY', 'pt-br');

    return $(obj).DataTable({
        fixedHeader: {
            header: false,
            footer: false
        },
        paging: true,
        lengthChange: true,
        iDisplayLength: 10,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        scrollX: true,
        scrollY: true,
        dom: "<'row'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [{'extend': 'print', 'text': 'Imprimir Dados', 'className': 'btn btn-default'}],
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "columnDefs": [
            {"targets": [0], "searchable": false, "orderable": false, "visible": true}
        ],
        "order": [[9, 'desc']]
    });
}

function datatablenovo(obj) {
    moment.locale('pt-br');
    $.fn.dataTable.moment('DD/MM/YYYY', 'pt-br');

    return $(obj).DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

function datatableComImprimirCSVOrdenarDataColunaNove(obj) {
    moment.locale('pt-br');
    $.fn.dataTable.moment('DD/MM/YYYY', 'pt-br');

    return $(obj).DataTable({
        fixedHeader: {
            header: false,
            footer: false
        },
        paging: true,
        lengthChange: true,
        iDisplayLength: 10,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        scrollX: true,
        scrollY: true,
        //dom: 'Bfrtip',
        dom: "<'row'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
            {'extend': 'print', 'text': 'Imprimir', 'className': 'btn btn-default'},
            {
                'extend': 'csv', 'text': 'Exportar', 'className': 'btn btn-default',
                'exportOptions': {
                    'modifier': {
                        'search': 'none'
                    }
                }
            }
        ],
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "columnDefs": [
            {"targets": [0], "searchable": false, "orderable": false, "visible": true}
        ],
        "order": [[9, 'desc']]
    });
}

function datatablepesquisa(obj) {
    $(obj).DataTable({
        'paging': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

//inicialização Datatable
function datatableallrecords(obj) {
    $(obj).DataTable({
        fixedHeader: {
            header: true,
            footer: false
        },
        'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'Todos os itens']],
        'paging': true,
        'searching': false,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

function removeHorasData(dateString) {
    dateString = new Date(dateString).toLocaleString();
    dateString = dateString.substring(0, 10);
    return dateString;
}

async function buscarLocalPadrao(filialId) {
    let retorno

    await $.ajax({
        url: `/ros/local/localpadrao/${filialId}`,
        type: "GET",
        success: function (resp) {
            retorno = resp
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })

    return retorno


}

function maskaraCNPJ(campo) {
    campo = campo.replace(/\D/g, "")
    var valor = campo;
    while (valor.length < 14) {
        if (valor.length < 14) {
            valor = "0" + valor;
        }
    }
    campo = cnpjMascaka(valor);
    return campo
}

function cnpjMascaka(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "")

    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")

    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")

    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")

    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")

    return v

}