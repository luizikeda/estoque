package com.projetoestacio.estoque.interfaces;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.model.Venda;
import com.projetoestacio.estoque.repository.VendasDAO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface IVendasService {

    Venda adicionarProdutoNaVenda(String vendaId, ProdutoQuantidadeRequest produtoQuantidadeRequest) throws Exception;

    Venda obterVendaPorId(String id) throws Exception;

    List<Venda> listarVendas();

    Venda criarVenda(Venda venda);
}
