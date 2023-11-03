package com.projetoestacio.estoque.repository;

import com.projetoestacio.estoque.model.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VendasDAO extends JpaRepository<Venda, String> {
    @Query(nativeQuery = true, value =
            "SELECT v.id, v.datavenda, v.tipo_pagamento_enum " +
                    "FROM venda v " +
                    "WHERE upper(v.tipo_pagamento_enum) LIKE upper(concat('%', :tipoPagamento, '%'))")
    Page<Object[]> getListarVendas(
            @Param("tipoPagamento") String tipoPagamento,
            Pageable pageable);
}
