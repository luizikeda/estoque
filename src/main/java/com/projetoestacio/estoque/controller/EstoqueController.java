package com.projetoestacio.estoque.controller;

import com.projetoestacio.estoque.model.ProdutoModel;
import com.projetoestacio.estoque.service.ProdutoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
        ProdutoModel produtoModel = new ProdutoModel();
        ModelAndView mv = new ModelAndView("produto/form_produto");
        mv.addObject("produto", produtoModel);
        return mv;
    }

    @RequestMapping(value = "/salvar", method = RequestMethod.POST)
    public String salvar(@Validated ProdutoModel produtoModel, Errors errors, RedirectAttributes attributes) {
        if (errors.hasErrors())
            return "form_produto";

        try {
            produtoService.salvar(produtoModel);
            return "redirect:/estoque/cadastro";
        } catch (Exception e) {
            return "form_produto";
        }
    }
}
