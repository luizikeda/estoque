package com.projetoestacio.estoque.service;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.interfaces.IVendasService;
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
public class VendasService  implements IVendasService {
    @Autowired
    VendasDAO vendasDAO;
    @Autowired
    ProdutoDAO produtoDAO;
    @Autowired
    ProdutoVendaDAO produtoVendaDAO;

    public Venda adicionarProdutoNaVenda(String vendaId, ProdutoQuantidadeRequest produtoQuantidadeRequest) throws Exception {
        Venda venda = vendasDAO.findById(vendaId).orElseThrow(() -> new Exception("Venda não encontrada com ID: " + vendaId));
        Produto produto = produtoDAO.findById(produtoQuantidadeRequest.getProdutoId()).orElseThrow(() -> new Exception("Produto não encontrado com ID: " + produtoQuantidadeRequest.getProdutoId()));

        if (Integer.parseInt(produto.getEstoque()) < produtoQuantidadeRequest.getQuantidade()) {
            throw new Exception("Quantidade insuficiente em estoque para o produto com ID: " + produto.getId());
        }

        ProdutoVenda produtoVenda = new ProdutoVenda(produto, venda, produtoQuantidadeRequest.getQuantidade());
        produtoVendaDAO.save(produtoVenda);
        return venda;
    }

    public Venda obterVendaPorId(String id) throws Exception {
        return vendasDAO.findById(id).orElseThrow(() -> new Exception("Venda não encontrada com ID: " + id));
    }

    public List<Venda> listarVendas() {
        return vendasDAO.findAll();
    }

    public Venda criarVenda(Venda venda) {
        return vendasDAO.save(venda);
    }

}
