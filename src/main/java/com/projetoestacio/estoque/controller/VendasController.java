package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.dto.ProdutoQuantidadeRequest;
import com.projetoestacio.estoque.interfaces.*;
import com.projetoestacio.estoque.model.Venda;
import com.projetoestacio.estoque.repository.VendasDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendasController{

    @Autowired
     IVendasService vendaService;

    @Autowired
    VendasDAO vendasDAO;

    @PostMapping
    public Venda criarVenda(@RequestBody Venda venda) {
        return vendaService.criarVenda(venda);
    }

    @PostMapping("/{vendaId}/adicionarProduto")
    public Venda adicionarProdutoNaVenda(@PathVariable String vendaId, @RequestBody ProdutoQuantidadeRequest produtoQuantidadeRequest) {
        return vendaService.adicionarProdutoNaVenda(vendaId, produtoQuantidadeRequest);
    }

    @GetMapping("/{id}")
    public Venda obterVendaPorId(@PathVariable String id) {
        return vendaService.obterVendaPorId(id);
    }

    @GetMapping
    public List<Venda> listarVendas() {
        return vendaService.listarVendas();
    }

    @DeleteMapping(value = "/delete/{vendaId}", produces = "application/json")
    public ResponseEntity excluirProdutoVenda(@PathVariable("vendaId") String vendaId){
        try {
            Venda venda = vendasDAO.findById(vendaId).orElse(null);
            vendasDAO.delete(venda);
            return new ResponseEntity("Produto Deletado Com Sucesso", HttpStatus.OK);
        } catch (Exception outro) {
            throw outro;
        }
    }

}
