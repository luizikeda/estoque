package com.projetoestacio.estoque.service;

import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.repository.ProdutoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    @Autowired
    ProdutoDAO produtoDAO;

    public void salvar(Produto produtoModel) throws Exception {

        produtoDAO.save(produtoModel);
    }

}
