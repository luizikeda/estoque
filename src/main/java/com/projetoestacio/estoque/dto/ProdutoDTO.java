package com.projetoestacio.estoque.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

public class ProdutoDTO {

    String sku;

    String nome;

    String valor;

    Date datavalidade;

    String categoria;

    String descricao;

    String estoque;

    String precounitario;

    String id;

    public ProdutoDTO(Object[] obj) throws ParseException {
        this.sku = obj[0].toString();
        this.nome = obj[1].toString();
        this.valor = obj[2].toString();
        this.datavalidade = Objects.nonNull(obj[3]) ?  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(obj[3].toString()) : null;
        this.categoria = obj[4].toString();
        this.descricao = obj[5].toString();
        this.estoque = obj[6].toString();
        this.precounitario = obj[7].toString();
        this.id = obj[8].toString();
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

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public Date getDatavalidade() {
        return datavalidade;
    }

    public void setDatavalidade(Date datavalidade) {
        this.datavalidade = datavalidade;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEstoque() {
        return estoque;
    }

    public void setEstoque(String estoque) {
        this.estoque = estoque;
    }

    public String getPrecounitario() {
        return precounitario;
    }

    public void setPrecounitario(String precounitario) {
        this.precounitario = precounitario;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
