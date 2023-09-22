package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface ProdutoDAO extends JpaRepository<Produto, String> {

    @Query(nativeQuery = true, value =
    "select p.sku, p.nome, p.valor, p.datavalidade, p.id, p.descricao, p.estoque, p.precounitario, p.id  " +
            "from produto p " +
            "where upper(p.sku) like upper(concat('%', :sku, '%'))  " +
            "and upper(p.nome) like upper(concat('%', :nome, '%'))")
    Page<Object[]> getListarProdutos(
            @Param("sku") String sku,
            @Param("nome") String nome,
            Pageable pageable);
}