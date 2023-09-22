package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoDAO extends CrudRepository<Produto, String> {

    @Query(nativeQuery = true, value =
    "select c.sku, c.nome from produto c/n" +
        "where upper(c.sku) like upper(concat('%', :sku, '%'))/n" +
        "and upper(c.nome) like upper(concat('%' : nome, '%'))/n")

    List<Object[]> getListarProdutos(
            @Param("sku") String sku,
            @Param("nome") String nome
    );
}