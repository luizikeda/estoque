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
public class VendasService implements IVendasService {
    @Autowired
    VendasDAO _vendasDAO;
    @Autowired
    ProdutoDAO produtoDAO;
    @Autowired
    ProdutoVendaDAO _produtovendaDAO;

    public Venda criarVenda(Venda venda) {
        return _vendasDAO.save(venda);
    }

    public Venda adicionarProdutoNaVenda(String vendaId, ProdutoQuantidadeRequest produtoQuantidadeRequest) {
        Venda venda = _vendasDAO.findById(vendaId).orElse(null);
        Produto produto = produtoDAO.findById(produtoQuantidadeRequest.getProdutoId()).orElse(null);
        if(Integer.parseInt(produto.getEstoque())<produtoQuantidadeRequest.getQuantidade())
            return null;
        if (venda != null && produto != null) {
            ProdutoVenda produtovenda = new ProdutoVenda(produto, venda, produtoQuantidadeRequest.getQuantidade());
            _produtovendaDAO.save(produtovenda);
            return venda;
        } else {
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
