package com.projetoestacio.estoque.model.enums;

public enum TipoPagamentoEmum {

    CREDITO("Credito"),
    DEBITO("Débito"),
    PIX("PIX"),
    DINHEIRO("Dinheiro");

    private String descricao;

    TipoPagamentoEmum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
