package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.interfaces.*;
import com.projetoestacio.estoque.model.Venda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendasController{

    @Autowired
    private IVendasService vendaService;

    // Criar nova venda:
    @PostMapping
    public Venda criarVenda(@RequestBody Venda venda) {
        return vendaService.criarVenda(venda);
    }

    // Adicionar um produto a uma venda:
    @PostMapping("/{vendaId}/adicionarProduto")
    public Venda adicionarProdutoNaVenda(@PathVariable String vendaId, @RequestBody ProdutoQuantidadeRequest produtoQuantidadeRequest) {
        return vendaService.adicionarProdutoNaVenda(vendaId, produtoQuantidadeRequest);
    }

    // Obter uma venda por ID:
    @GetMapping("/{id}")
    public Venda obterVendaPorId(@PathVariable String id) {
        return vendaService.obterVendaPorId(id);
    }

    // Lista todas as vendas:
    @GetMapping
    public List<Venda> listarVendas() {
        return vendaService.listarVendas();
    }
}