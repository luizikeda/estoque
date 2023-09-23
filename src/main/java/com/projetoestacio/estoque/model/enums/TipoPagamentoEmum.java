package com.projetoestacio.estoque.model.enums;

public enum TipoPagamentoEmum {

    CREDITO("Credito"),
    PENDENTE("Pendente"),
    CANCELADA("Cancelada");

    private String descricao;

    TipoPagamentoEmum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
