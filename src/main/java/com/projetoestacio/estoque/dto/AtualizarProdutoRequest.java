package com.projetoestacio.estoque.dto;

import com.projetoestacio.estoque.model.enums.CategoriaEnum;

import java.util.Date;

public class AtualizarProdutoRequest {

    String nome;

    String valor;

    Date datavalidade;

    String categoria;

    String descricao;

    String estoque;

    String precounitario;

    public AtualizarProdutoRequest(String nome, String valor, Date datavalidade, String categoria, String descricao, String estoque, String precounitario) {
        this.nome = nome;
        this.valor = valor;
        this.datavalidade = datavalidade;
        this.categoria = categoria;
        this.descricao = descricao;
        this.estoque = estoque;
        this.precounitario = precounitario;
    }

    public String getNome() {
        return nome;
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

    public void setCategoria(CategoriaEnum categoria) {
        this.categoria = String.valueOf(categoria);
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

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }
}
