package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.model.ProdutoVenda;
import com.projetoestacio.estoque.model.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoVendaDAO extends JpaRepository<ProdutoVenda, String> {
    @Query(nativeQuery = true, value =
            "SELECT vp.id, vp.produto_id, vp.venda_id, vp.quantidade " +
                    "FROM venda_produto vp " +
                    "INNER JOIN venda v ON vp.venda_id = v.id " +
                    "WHERE upper(v.tipo_pagamento_enum) LIKE upper(concat('%', :tipoPagamento, '%'))")
    Page<Object[]> getListarVendasPorTipoPagamento(
            @Param("tipoPagamento") String tipoPagamento,
            Pageable pageable);

    List<ProdutoVenda> findByProdutoVenda(Produto produto, Venda venda);
}
