package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.model.enums.CategoriaEnum;
import com.projetoestacio.estoque.service.ProdutoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Arrays;
import java.util.List;

@RestController
public class EstoqueController {

    @Autowired
    ProdutoService produtoService;

    @RequestMapping
    public ModelAndView produtoLista() {
        ModelAndView mv = new ModelAndView("produto/list_produto");
        return mv;
    }

    @GetMapping("/cadastro")
    public ModelAndView cadastro(HttpSession httpSession){
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
            produtoService.salvar(produtoModel);
            return "redirect:/estoque/cadastro";
        } catch (Exception e) {
            return "form_produto";
        }
    }

    @ModelAttribute("todasCategorias")
    public List<CategoriaEnum> todasCategorias() {
        return Arrays.asList(CategoriaEnum.values());
    }
}
