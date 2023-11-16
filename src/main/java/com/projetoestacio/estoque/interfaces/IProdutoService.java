package com.projetoestacio.estoque.interfaces;

import com.projetoestacio.estoque.dto.AtualizarProdutoRequest;
import com.projetoestacio.estoque.dto.filter.ProdutoFilter;
import com.projetoestacio.estoque.model.Produto;
import jakarta.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface IProdutoService {
    void salvar(Produto produtoModel)throws Exception;
    public Map<String, Object> findByCampos(ProdutoFilter filter, HttpServletRequest request) throws ParseException;
    public List<Produto> listaProdutos();
    public Produto BuscaProdutoBySku(String sku);
    public Produto AtualizaProduto (String produtoid, AtualizarProdutoRequest ProdutoRequest) throws Exception;
}
