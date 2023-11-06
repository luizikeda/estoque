package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.model.Venda;
import com.projetoestacio.estoque.service.VendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendasController{

    @Autowired
    VendasService vendaService;


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

    // Remover um produto de uma venda:
    @DeleteMapping("/{vendaId}/removerProduto")
    public Venda removerProdutoDaVenda(@PathVariable String vendaId, @RequestBody String produtoId) {
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
