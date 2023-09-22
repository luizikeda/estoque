function limpar() {
    window.location.reload();
}

function filtrar() {

    let sku = $('#sku').val();
    let nome = $('#nome').val();

    $("#tblProdutoLista").DataTable().destroy();
    $("#tblProdutoLista").DataTable({
        serverSide: true,
        paging: true,
        searching: true,
        ajax: {
            url: '/estoque/filtrar',
            type: 'GET',
            data: {
                "sku": sku,
                "nome": nome,
            }
        },
        columns: [
            {data: 'sku'},
            {data: 'nome'},
            {data: 'valor'},
            {data: 'datavalidade'},
            {data: 'categoria'},
            {data: 'descricao'},
            {data: 'estoque'},
            {data: 'precounitario'},
            {data: 'id'},
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
        },
    });
}

function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        // Fazer uma requisição para excluir o produto com o ID fornecido.
        $.ajax({
            url: '/produto/excluir',
            type: 'POST', // Ou 'DELETE', dependendo da sua API
            data: {id: id},
            success: function (response) {
                // Produto excluído com sucesso, você pode atualizar a lista de produtos ou fazer qualquer outra ação necessária.
                alert("Produto excluído com sucesso!");
                // Atualizar a lista de produtos, recarregar a página ou realizar outras ações necessárias.
            },
            error: function (error) {
                // Tratar o erro, se necessário.
                console.error("Erro ao excluir produto:", error);
            }
        });
    }
}