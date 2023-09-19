var filial;
var modalController;
var filtrarCategorias;
var tablePrecos;

$(document).ready(function () {

    filial = $('#filiais option:selected').attr("id");

    $(document).ready(function () {
        var table = $('#tblProdutoPreco').DataTable({
            autoFill: true
        });

        table.on('autoFill', function () {
            table.columns.adjust();
        });
    });

    generateDatatable();

    /* Corrigir bug de filtros abris com clicke na tabela. */
    $("#toggleBotao").click(function (e) {
        e.preventDefault();
        $(".control-sidebar").removeClass("control-sidebar-open");
    });

    if ($('#textsku').val()) {
        atualizarProdutos();
    }

    $('body').on('expanded.pushMenu collapsed.pushMenu', function () {
        setTimeout(function () {
            $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
        }, 350);
    });

    $(".categoriaCompleta").each(function (i) {
        $(this).text(categoriaCompleta($(this).text()))
    });

    $(function () {
        var decimal = $(".js-preco-produto");
        decimal.maskMoney({decimal: ',', thousands: '.'});
    });

});


function atualizarProdutos() {
    $('#tblProdutoLista').DataTable().destroy();

    var sku = $('#textsku').val();
    var descricao = $('#textdescricao').val();
    var codigoacesso = $('#textcodigoacesso').val();

    if (filtrarCategorias == undefined) {
        filtrarCategorias = "";
    }


    $("#tblProdutoLista").DataTable({
        lengthMenu: [10, 20, 50, 100],
        serverSide: true,
        paging: true,
        searching: false,
        autoWidth: true,
        ajax: {
            url: "/ros/cadastroproduto/produtofiltrar",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataSrc: 'data',
            data: function (d) {
                d.sku = sku,
                    d.descricao = descricao,
                    d.codigoacesso = codigoacesso,
                    d.filtrarCategorias = filtrarCategorias
                return JSON.stringify(d)
            }
        },
        columns: [
            {data: 'sku'},
            {data: 'descReduzida'},
            {data: 'descricao'},
            {
                data: 'id',
                render: function (data, type, row) {
                    var btnEditar = '<td class="text-center"><a class="btn btn-link btn-xs" href="/ros/cadastroproduto/' + row.sku + '"><span class="glyphicon glyphicon-edit"></span></a> </td>';
                    return btnEditar;
                }
            },
            {
                data: 'id',
                render: function (data, type, row) {
                    var btnVisualizar = '<td class="text-center"> <button class="btn btn-link btn-xs" title="Visualizar" rel="tooltip" data-placement="top" onclick="visualisarProduto(\'' + row.id + '\')"><span class="glyphicon glyphicon-eye-open"></span></button> </td>';
                    return btnVisualizar;
                }
            }
        ],
        language: {
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

function loadTable(lista) {

    var linha = "";
    lista.forEach(function (item) {
        linha = linha + '<tr id="' + item.sku + '">'
            + ' <td>' + item.sku + '</td>'
            + ' <td>' + item.descReduzida + '</td>'
            + ' <td>' + item.descricao + '</td>'
            + ' <td><a class="btn btn-link btn-xs" href="/ros/cadastroproduto/' + item.sku + '"'
            + '     title="Editar" rel="tooltip" data-placement="top">'
            + '         <span class="glyphicon glyphicon-edit"></span></a> </td>'
            + '</td>'
            + ' <td><button class="btn btn-link btn-xs" onclick="visualisarProduto(\'' + item.id + '\')"'
            + '     title="Visualizar" rel="tooltip" data-placement="top">'
            + '         <span class="glyphicon glyphicon-eye-open"></span></button> </td>'
            + '</td>';
    });
    return linha;
    //'       th:href="@{/cadastroproduto/{id}(id=${'+item.sku+'})}"' href="/ros/cadastroproduto/editar/'+ item.sku +'"'
    //th:href="@{/cadastroproduto/{id}(id=${'+item.sku+'})}"'
}

function removeParent(id) {
    var removeModal = document.getElementById(id);
    if (removeModal != null) {
        removeModal.parentNode.removeChild(removeModal);
    }
}

function generateDatatable() {
    $('#tblProdutoLista').DataTable({
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'autoWidth': true,
        'iDisplayLength': 10,
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

function limpar() {
    window.location.reload();
}

function visualisarProduto(id) {

    $('#modal-visualizar-produto').modal('toggle');
    informacoesEntidadeProduto(id);
    informacoesEntidadeProdutoFilial(id);
    informacoesEntidadeProdutoEmbalagem(id);
    informacoesEntidadeProdutoCodigo(id);
    informacoesEntidadeProdutoFilialTipoEndereco(id);
    informacoesEntidadeProdutoFilialTipoArmazenagem(id);
    informacoesEntidadeProdutoEndereco(id);
    informacoesProdutoPreco(id);
    informacoesProdutoFornecedor(id);
    informacoesProdutoLocal(id);
}

function informacoesEntidadeProduto(id) {
//INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTO
    var retorno;
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProduto",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
        }
    });
    $('#produtosku').val(retorno.sku);
    $('#produtodescReduzida').val(retorno.descReduzida);
    $('#produtodescricao').val(retorno.descricao);
    $('#produtodiasMinimoValidade').val(retorno.diasMinimoValidade);
    $('#aprendizagemvalidade').val(retorno.aprendizagemvalidade).trigger('change');
    $('#pesavel').val(retorno.pesavel).trigger('change');
    $('#ativoimobilizado').val(retorno.ativoImobilizado).trigger('change');

    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTO
}

function informacoesEntidadeProdutoFilial(id) {
    var retorno;
//INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIAL
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoFilial",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
        }
    });
    $('#tblProdutoFilial').DataTable().destroy();
    var contentProdutoFilial = "";
    retorno.forEach(function (produtoFilial) {
        var comprador = "";
        var categoria = "";
        if (produtoFilial.comprador != null) {
            comprador = produtoFilial.comprador.nome;
        }
        if (produtoFilial.codigoCategoria != null) {
            categoria = categoriaCompleta(produtoFilial.codigoCategoria);
        }
        contentProdutoFilial += '' +
            '<tr>' +
            '<td class="text-left">' + produtoFilial.filial.nome + '</td>' +
            '<td class="text-left">' + switchControlaValidadeFilialLetra(produtoFilial.controlavalidade) + '</td>' +
            '<td class="text-right">' + ((produtoFilial.perctoleranciavalidaderec === null) ? "" : produtoFilial.perctoleranciavalidaderec) + '</td>' +
            '<td class="text-left"  class="categoriaCompleta" >' + categoria + '</td>' +
            '<td class="text-right">R$ ' + ((produtoFilial.vlrcustoliquido === null) ? "" : produtoFilial.vlrcustoliquido.toFixed(2).replace(".", ",")) + '</td>' +
            '<td class="text-right">' + produtoFilial.estoque + '</td>' +
            '<td class="text-left">' + comprador + '</td>' +
            '<td class="text-right">' + ((produtoFilial.mediavendadia === null) ? "" : produtoFilial.mediavendadia.toFixed(2).replace(".", ",")) + '</td>' +
            '</tr>';
    });
    $('#produtoFilialAreaTabela').html(contentProdutoFilial);
    datatablepesquisa('#tblProdutoFilial')
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIAL
}

function informacoesEntidadeProdutoEmbalagem(id) {
    var retorno;
//INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOEMBALAGEM
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoEmbalagem",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
        }
    });

    var contentProdutoEmbalagem = "";
    retorno.forEach(function (produtoEmbalagem) {
        contentProdutoEmbalagem += '' +
            '<tr>' +
            '<td class="text-left">' + produtoEmbalagem.tipoEmbalagem + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.embalagemQtd + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.pesoBruto + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.pesoLiquido + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.altura + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.largura + '</td>' +
            '<td class="text-left">' + produtoEmbalagem.profundidade + '</td>' +
            '</tr>';
    });
    $('#produtoEmbalagemAreaTabela').html(contentProdutoEmbalagem);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOEMBALAGEM
}

function informacoesEntidadeProdutoCodigo(id) {
    var retorno;
//INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOCODIGO
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoCodigo",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
        }
    });

    var contentProdutoCodigo = "";
    retorno.forEach(function (produtoCodigo) {
        contentProdutoCodigo += '' +
            '<tr>' +
            '<td class="text-left">' + produtoCodigo.tipo + '</td>' +
            '<td class="text-left">' + produtoCodigo.codigo + '</td>' +
            '<td class="text-left">' + produtoCodigo.embalagemQtd + '</td>' +
            '<td class="text-left">' + produtoCodigo.ativo + '</td>' +
            '</tr>';
    });
    $('#produtoCodigoAreaTabela').html(contentProdutoCodigo);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOCODIGO
}

function informacoesEntidadeProdutoFilialTipoEndereco(id) {
    var retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIALTIPOENDERECO
    $.ajax({
        url: "/ros/cadastroproduto/informacoesEntidadeProdutoFilialTipoEndereco",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id,
            filial: filial
        },
        success: function (data) {
            retorno = data;
        }
    });

    var contentlstTipoEndereco = "";
    retorno.forEach(function (produtoFilialTipoEndereco) {
        contentlstTipoEndereco += '' +
            '<tr>' +
            '<td class="text-left">' + produtoFilialTipoEndereco.tipoEndereco.codigo + '</td>' +
            '<td class="text-left">' + produtoFilialTipoEndereco.tipoEndereco.descricao + '</td>' +
            '</tr>';
    });
    $('#lstTipoEndereco').html(contentlstTipoEndereco);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIALTIPOENDERECO
}

function informacoesEntidadeProdutoFilialTipoArmazenagem(id) {
    var retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIALTIPOARMAZENAGEM
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoFilialTipoArmazenagem",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id,
            filial: filial
        },
        success: function (data) {
            retorno = data;
        }
    });

    var contentlstTipoArmazenagem = "";
    retorno.forEach(function (produtoFilialTipoArmazenagem) {
        contentlstTipoArmazenagem += '' +
            '<tr>' +
            '<td class="text-left">' + produtoFilialTipoArmazenagem.descricao + '</td>' +
            '</tr>';
    });
    $('#lstTipoArmazenagem').html(contentlstTipoArmazenagem);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOFILIALTIPOARMAZENAGEM
}

function informacoesEntidadeProdutoEndereco(id) {
    var retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOENDERECO
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoEndereco",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id,
            filial: filial
        },
        success: function (data) {
            retorno = data;
        }
    });
    var contentlstProdutoEndereco = "";
    retorno.forEach(function (produtoEndereco) {
        contentlstProdutoEndereco += '' +
            '<tr>' +
            '<td class="text-left">' + produtoEndereco.endereco.descricao + '</td>' +
            '<td class="text-left">' + produtoEndereco.endereco.filial.nome + '</td>' +
            '<td class="text-center">' + new Date(produtoEndereco.dataFabricacao).toLocaleDateString() + '</td>' +
            '<td class="text-center">' + new Date(produtoEndereco.dataValidade).toLocaleDateString() + '</td>' +
            '<td class="text-right">' + produtoEndereco.quantidade + '</td>' +
            '</tr>';
    });
    $('#lstProdutoEndereco').html(contentlstProdutoEndereco);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOENDERECO
}

function informacoesProdutoPreco(id) {
    var retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOPRECO
    $.ajax({
        url: "/ros/cadastroproduto/informacoesProdutoEmbalagemFilialSeg",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            id: id,
            filial: filial
        },
        render: $.fn.dataTable.render.number(',', '.', 2),
        success: function (data) {
            retorno = data;
        }
    });

    $('#tblProdutoPreco').DataTable().destroy();
    var contenttblProdutoPreco = "";
    retorno.forEach(function (produtoEmbFilialSeg) {
        contenttblProdutoPreco += '' +
            '<tr>' +
            '<td class="text-left">' + produtoEmbFilialSeg.produtoEmbalagem.embalagemQtd + '</td>' +
            '<td class="text-left">' + produtoEmbFilialSeg.produtoEmbalagem.tipoEmbalagem + '</td>' +
            '<td class="text-left">' + produtoEmbFilialSeg.filialSegmento.filial.nome + '</td>' +
            '<td class="text-left">' + produtoEmbFilialSeg.filialSegmento.segmento.descricao + '</td>' +
            '<td class="text-right">' + produtoEmbFilialSeg.preco + '</td>' +
            '</tr>';
    });
    $('#lstProdutoPreco').html(contenttblProdutoPreco);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOPRECO


    datatablepesquisa('#tblProdutoPreco');
    setTimeout(function () {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    }, 350);

    /* tablePrecos.on( 'autoFill', function () {
         tablePrecos.columns.adjust();
     });*/
}

function switchControlaValidadeFilialLetra(param) {
    //console.log(param)
    switch (param) {
        case "B":
            return "Bloqueia";
        case "I":
            return "Gera Inconsitência";
        case "N":
            return "Não Controla";
        case "A":
            return "Alerta";
        case "C":
            return "Conforme Categoria";
        case "F":
            return "Conforme Filial";
    }
}

function clickHackFix() {
    setTimeout(function () {
        document.getElementById('clickHackFix').click();
    }, 200);
}

function categoriaCompleta(id) {
    var retorno;
    $.ajax({
        url: '/ros/cadastroproduto/categoriacompleta',
        type: "GET",
        data: {
            id: id
        },
        async: false,
        success: function (data) {
            retorno = data;
        }
    });
    return retorno;
}

function informacoesProdutoFornecedor(id) {
    var retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOPRECO
    $.ajax({
        url: "/ros/cadastroproduto/listarProdutoFornecedor",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
            if (data.length == 0) {
                $("#lstProdutoFornecedor").html("<tr><td colspan='4'>Nenhum registro encontrado</td></tr>");
                return;
            }
        }
    });

    $('#tblProdutoFornecedor').DataTable().destroy();
    var contenttblProdutoFornecedor = "";
    retorno.forEach(function (item) {
        var cnpj = FormatarCnpjCPF(item.fornecedor.pessoa.cnpjcpf);
        var principal = (item.principal) ? 'Sim' : 'Não';
        contenttblProdutoFornecedor += '' +
            '<tr>' +
            '<td class="text-left">' + item.fornecedor.pessoa.codigo + '</td>' +
            '<td class="text-left">' + item.fornecedor.pessoa.razao + '</td>' +
            '<td class="text-left">' + maskaraCNPJ(cnpj) + '</td>' +
            '<td class="text-left">' + principal + '</td>' +
            '</tr>';
    });
    $("#lstProdutoFornecedor").html(contenttblProdutoFornecedor);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE FORNECEDOR

    datatablepesquisa('#tblProdutoFornecedor');
}

function informacoesProdutoLocal(id) {
    let retorno;
    //INICIO INFORMAÇÕES REFERENTES A ENTIDADE PRODUTOPRECO
    $.ajax({
        url: "/ros/cadastroproduto/listarProdutoLocal",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: {
            id: id
        },
        success: function (data) {
            retorno = data;
            if (data.length == 0) {
                $("#tblProdutoLocal").html("<tr><td colspan='4'>Nenhum registro encontrado</td></tr>");
                return;
            }
        }
    });

    $('#tblProdutoLocal').DataTable().destroy();
    var contenttblProdutoFornecedor = "";
    retorno.forEach(function (item) {
        contenttblProdutoFornecedor += '' +
            '<tr>' +
            '<td class="text-left">' + item.filial + '</td>' +
            '<td class="text-left">' + item.local + '</td>' +
            `<td class="text-left"> ${item.dtvalidade || 'Nada a mostrar'} </td>` +  /*${item.dtvalidade == null ? 'nada a mostrar' : item.dtvalidade}*/
            '<td class="text-right">' + item.quantidade.toFixed(3) + '</td>' +
            '</tr>';

    });
    $("#tblProdutoLocal tbody").html(contenttblProdutoFornecedor);
    //FIM INFORMAÇÕES REFERENTES A ENTIDADE FORNECEDOR

    datatablepesquisa('#tblProdutoLocal');
}


