var filial;
var modalInitializer = 0;

$(document).ready(function () {
    var str = $('#filiais option:selected').text();
    filial = $('#filiais option:selected').attr("id");
})

function categorias(filialSelecionada){
    iniciarLoading();
    modalFiltrarCategorias(filialSelecionada);
    pararLoading();
}

function iniciarLoading(){
    $('body').loading('start');
}

function modalFiltrarCategorias(filialSelecionada){
    // if(modalInitializer == 0) {

        removeParent(modalController);
        var dynamicModal = document.createElement("div");
        dynamicModal.setAttribute("class", "modal fade");
        dynamicModal.id = "modal-categorias";
        modalController = "modal-categorias";

        var retorno;

        $.ajax({
            url: "/ros/categoria/categoriasPaiComponent",
            type: "POST",
            async: false,
            data: {
                "filial": filialSelecionada ? filialSelecionada : filial
            },
            success: function (data) {
                retorno = data;
            }
        });

        var listaCategoria = constroiListaCategoria(retorno);

        dynamicModal.innerHTML = "<div class='modal-dialog' style='width:80%'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>" +
            "<span aria-hidden='true'>&times;</span>" +
            "</button>" +
            "<h4 class='modal-title'>Filtrar Categorias</h4>" +
            "</div>" +
            "<div class='modal-body table-responsive' id='modalBody'>" +
            "<div id='jstree' style>" +
            listaCategoria +
            "</div>" +
            "</div>" +
            "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-default pull-left' data-dismiss='modal' onclick='cancelar()'>Cancelar</button>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='filtrarPorCategorias()'>Confirmar</button>" +
            "</div>" +
            "</div>" +
            "</div>";
        var modalarea = document.getElementById("modalArea");

        modalarea.parentNode.insertBefore(dynamicModal, modalarea.nextSibling);

        $('#jstree').jstree({
            "plugins": [ "wholerow", "checkbox"]
        });

        $('#jstree').on("changed.jstree", function (e, data) {
            var id = data.selected;
        });

        $('button').on('click', function () {
            $('#jstree').jstree(true).select_node('child_node_1');
            $('#jstree').jstree('select_node', 'child_node_1');
            $.jstree.reference('#jstree').select_node('child_node_1');
        });
        callModal();
        modalInitializer = 1;
    // }
    callModal();
}


function constroiListaCategoria(retorno){
    var listaCategoria = "<ul>";
    retorno.forEach(function(linha){
        listaCategoria += "<li id='"+linha.categoria.codigo+"'>"+linha.categoria.nome+"";
        var listaFilhos = linha.categoriaDTOList;
        if(listaFilhos != "[]"){
            listaCategoria += constroiListaCategoria(listaFilhos);
        }
        else{
            listaCategoria +="</li>";
        }
    });
    listaCategoria += "</ul>";
    return listaCategoria

}
function removeParent(id) {
    var removeModal = document.getElementById(id);
    if (removeModal != null) {
        removeModal.parentNode.removeChild(removeModal);
    }
}

function callModal(){
    $('#modal-categorias').modal('show');
}

function cancelar(){
    $('#jstree').jstree('deselect_all');
    document.getElementById("categoriaFilter").innerHTML = "Categorias"
}

function pararLoading(){
    $('body').loading('stop');
}

function filtrarPorCategorias()
{
    filtrarCategorias = $('#jstree').jstree("get_selected", true);

}