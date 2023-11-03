package com.projetoestacio.estoque.service;

import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.model.Venda;
import com.projetoestacio.estoque.repository.ProdutoDAO;
import com.projetoestacio.estoque.repository.VendasDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.awt.print.Pageable;
import java.util.List;

@Service
public class VendasService {
    @Autowired
    VendasDAO _vendasDAO;
    @Autowired
    ProdutoDAO produtoDAO;
    public Venda criarVenda(Venda venda) {
        return _vendasDAO.save(venda);
    }

    public Venda adicionarProdutoNaVenda(String vendaId, String produtoId) {
        Venda venda = _vendasDAO.findById(vendaId).orElse(null);
        Produto produto = produtoDAO.findById(produtoId).orElse(null);

        if (venda != null && produto != null) {
            venda.adicionarProduto(produto);
            return _vendasDAO.save(venda);
        } else {
            // Lida com erros ou retorna null/lança exceção, dependendo da sua lógica de negócios
            return null;
        }
    }

    public Venda removerProdutoDaVenda(String vendaId, String produtoId) {
        Venda venda = _vendasDAO.findById(vendaId).orElse(null);
        Produto produto = produtoDAO.findById(produtoId).orElse(null);

        if (venda != null && produto != null) {
            venda.removerProduto(produto);
            return _vendasDAO.save(venda);
        } else {
            // Lida com erros ou retorna null/lança exceção, dependendo da sua lógica de negócios
            return null;
        }
    }

    public Venda obterVendaPorId(String id) {
        return _vendasDAO.findById(id).orElse(null);
    }

    public List<Venda> listarVendas() {
        return _vendasDAO.findAll();
    }

    public void excluirVenda(String id) {
        _vendasDAO.deleteById(id);
    }

}
