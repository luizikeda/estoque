package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.Produto;
import org.springframework.data.repository.CrudRepository;

public interface ProdutoDAO extends CrudRepository<Produto, String> {
}
