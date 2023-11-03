package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.interfaces.IVendasService;
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
    @PostMapping("/{vendaId}/adicionarProduto/{produtoId}")
    public Venda adicionarProdutoNaVenda(@PathVariable String vendaId, @PathVariable String produtoId) {
        return vendaService.adicionarProdutoNaVenda(vendaId, produtoId);
    }

    // Remover um produto de uma venda:
    @DeleteMapping("/{vendaId}/removerProduto/{produtoId}")
    public Venda removerProdutoDaVenda(@PathVariable String vendaId, @PathVariable String produtoId) {
        return vendaService.removerProdutoDaVenda(vendaId, produtoId);
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
