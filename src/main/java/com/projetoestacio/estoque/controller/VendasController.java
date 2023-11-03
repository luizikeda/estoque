package com.projetoestacio.estoque.controller;

@RestController
@RequestMapping("/vendas")
public class VendasController{

    @Autowired
    private VendaService vendaService;

    // Endpoint para criar uma nova venda
    @PostMapping
    public Venda criarVenda(@RequestBody Venda venda) {
        return vendaService.criarVenda(venda);
    }

    // Endpoint para adicionar um produto a uma venda
    @PostMapping("/{vendaId}/adicionarProduto/{produtoId}")
    public Venda adicionarProdutoNaVenda(@PathVariable String vendaId, @PathVariable String produtoId) {
        return vendaService.adicionarProdutoNaVenda(vendaId, produtoId);
    }

    // Endpoint para remover um produto de uma venda
    @DeleteMapping("/{vendaId}/removerProduto/{produtoId}")
    public Venda removerProdutoDaVenda(@PathVariable String vendaId, @PathVariable String produtoId) {
        return vendaService.removerProdutoDaVenda(vendaId, produtoId);
    }

    // Endpoint para obter uma venda por ID
    @GetMapping("/{id}")
    public Venda obterVendaPorId(@PathVariable String id) {
        return vendaService.obterVendaPorId(id);
    }

    // Endpoint para listar todas as vendas
    @GetMapping
    public List<Venda> listarVendas() {
        return vendaService.listarVendas();
    }
}
