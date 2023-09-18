package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.ProdutoModel;
import org.springframework.data.repository.CrudRepository;

public interface ProdutoDAO extends CrudRepository<ProdutoModel, String> {
}
