package com.projetoestacio.estoque.dto;

import java.text.ParseException;

public class ProdutoDTO {

    String sku;

    String nome;

    public ProdutoDTO(Object[] obj) throws ParseException {
        this.sku = obj[0].toString();
        this.nome = obj[1].toString();
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
