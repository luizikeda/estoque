package com.projetoestacio.estoque.model.enums;

public enum StatusVendaEmum {

    REALIZADA("Realizada"),
    PENDENTE("Pendente"),
    CANCELADA("Cancelada");

    private String descricao;

    StatusVendaEmum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
