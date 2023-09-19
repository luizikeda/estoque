document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
});

function notifyMe(title, mensagem, link) {
    if (!Notification) {
        alert('O navegador que você está utilizando não possui o notifications. Tente o Chrome');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notification = new Notification(title, {
            icon: "http://localhost:8081/ros/img/sino.png",
            body: mensagem
        });

        notification.onclick = function () {
            window.open(link);
        };
    }
}

function pushBuscaQtdProdutosVencendo() {
    var link = "";
    $.ajax({
        url: "/ros/push/produtosvencendo",
        type: "GET",
        async: false,
        success: function (data) {
            if (data > 0)
                notifyMe("Atenção", "Existem produtos próximos de vencer. Verifique.", link);
        }
    })
}

function pushBuscaQtdProdutosVencendoAcao() {
    var link = "";
    $.ajax({
        url: "/ros/push/produtosvencendoacao",
        type: "GET",
        async: false,
        success: function (data) {
            if (data > 0)
                notifyMe("Atenção: Produtos vencendo", "Existem produtos próximos de vencer pendentes de ação. Verifique.", link);
        }
    })
}
