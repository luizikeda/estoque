package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.dto.filter.ProdutoFilter;
import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.model.enums.CategoriaEnum;
import com.projetoestacio.estoque.repository.ProdutoDAO;
import com.projetoestacio.estoque.service.ProdutoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class ProdutoController {

    @Autowired
    ProdutoService _produtoService;

    @Autowired
    ProdutoDAO produtoDAO;

    @RequestMapping
    public ModelAndView produtoLista() {
        ModelAndView mv = new ModelAndView("produto/list_produto");
        return mv;
    }

    @GetMapping("/cadastro")
    public ModelAndView cadastro(HttpSession httpSession) {
        Produto produtoModel = new Produto();
        ModelAndView mv = new ModelAndView("produto/form_produto");
        mv.addObject("produto", produtoModel);
        mv.addObject("todasCategorias", todasCategorias());
        return mv;
    }

    @RequestMapping(value = "/salvar", method = RequestMethod.POST)
    public String salvar(@Validated Produto produtoModel, Errors errors, RedirectAttributes attributes) {
        if (errors.hasErrors())
            return "form_produto";

        try {
            _produtoService.salvar(produtoModel);
            return "redirect:/estoque/cadastro";
        } catch (Exception e) {
            return "form_produto";
        }
    }

    @ModelAttribute("todasCategorias")
    public List<CategoriaEnum> todasCategorias() {
        return Arrays.asList(CategoriaEnum.values());
    }

    @GetMapping("/filtrar")
    public ResponseEntity findByCamposByFilial(ProdutoFilter filter, HttpServletRequest request) throws ParseException {
        Map<String, Object> estruturaDTOs = _produtoService.findByCampos(filter, request);
        return ResponseEntity.ok(estruturaDTOs);
    }

    @GetMapping("/listaProdutos")
    public ResponseEntity<List<Produto>> todosProdutos() {

        List<Produto> ListaProdutos = _produtoService.listaProdutos();
        if (ListaProdutos.stream().count() > 0)
            return new ResponseEntity<>(ListaProdutos, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/produto")
    public ResponseEntity<Produto> todosProdutos(String sku) {
        Produto produto = _produtoService.BuscaProdutoBySku(sku);
        if (produto == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(produto, HttpStatus.OK);
    }
}
