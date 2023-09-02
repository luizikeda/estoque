package com.projetoestacio.estoque.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/cadastro")
public class EstoqueController {

    @GetMapping
    public ModelAndView cadastro(HttpSession httpSession){
        ModelAndView mv = new ModelAndView("index");
        return mv;
    }
}
