package com.projetoestacio.estoque.model.enums;

public enum CategoriaEnum {
    ELETRONICOS("Eletronicos"),
    BEBIDA("Bebida"),
    ALIMENTO("Alimetos"),

    LIMPEZA("Limpeza"),
    OUTROS("Outros");



    private String descricao;

    CategoriaEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
