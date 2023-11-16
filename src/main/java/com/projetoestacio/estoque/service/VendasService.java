package com.projetoestacio.estoque.service;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.model.ProdutoVenda;
import com.projetoestacio.estoque.model.Venda;
import com.projetoestacio.estoque.repository.ProdutoDAO;
import com.projetoestacio.estoque.repository.ProdutoVendaDAO;
import com.projetoestacio.estoque.repository.VendasDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.awt.print.Pageable;
import java.util.List;

@Service
public class VendasService  {
    @Autowired
    VendasDAO vendasDAO;
    @Autowired
    ProdutoDAO produtoDAO;
    @Autowired
    ProdutoVendaDAO produtoVendaDAO;

    public Venda criarVenda(Venda venda) {
        return vendasDAO.save(venda);
    }

    public Venda adicionarProdutoNaVenda(String vendaId, ProdutoQuantidadeRequest produtoQuantidadeRequest) {
        Venda venda = vendasDAO.findById(vendaId).orElse(null);
        Produto produto = produtoDAO.findById(produtoQuantidadeRequest.getProdutoId()).orElse(null);
        if(Integer.parseInt(produto.getEstoque())<produtoQuantidadeRequest.getQuantidade())
            return null;
        if (venda != null && produto != null) {
            ProdutoVenda produtovenda = new ProdutoVenda(produto, venda, produtoQuantidadeRequest.getQuantidade());
            produtoVendaDAO.save(produtovenda);
            return venda;
        } else {
            return null;
        }
    }

    /*public Venda removerProdutoDaVenda(String vendaId, String produtoId) {
        Venda venda = vendasDAO.findById(vendaId).orElse(null);
        Produto produto = produtoDAO.findById(produtoId).orElse(null);

       List<ProdutoVenda> produtosVendas = produtoVendaDAO.findByProdutoVenda(produto,venda);
       ProdutoVenda produtoVenda = produtosVendas.stream().findFirst().orElse(null);

        if (produtoVenda!=null) {
           produtoVendaDAO.delete(produtoVenda);
           return venda;
        } else {
            return null;
        }
    }*/

    public Venda obterVendaPorId(String id) {
        return vendasDAO.findById(id).orElse(null);
    }

    public List<Venda> listarVendas() {
        return vendasDAO.findAll();
    }

}
