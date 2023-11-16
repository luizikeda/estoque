package com.projetoestacio.estoque.service;

import com.projetoestacio.estoque.dto.AtualizarProdutoRequest;
import com.projetoestacio.estoque.dto.ProdutoDTO;
import com.projetoestacio.estoque.dto.filter.ProdutoFilter;
import com.projetoestacio.estoque.interfaces.IProdutoService;
import com.projetoestacio.estoque.model.Produto;
import com.projetoestacio.estoque.repository.ProdutoDAO;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProdutoService implements IProdutoService {

    @Autowired
    ProdutoDAO produtoDAO;

    public void salvar(Produto produtoModel) throws Exception {

        produtoDAO.save(produtoModel);
    }

    private String[] cols = {"sku", "nome", "valor", "datavalidade", "categoria", "descricao", "estoque", "precounitario", "id"};

    public Map<String, Object> findByCampos(ProdutoFilter filter, HttpServletRequest request) throws ParseException {

        int draw = Integer.parseInt(request.getParameter("draw"));
        Pageable pageable = pagination(request);

        Page<Object[]> objects;
        objects = produtoDAO.getListarProdutos(filter.getSku(), filter.getNome(), pageable);

        return estruturaDTOToJson(objects, draw);
    }

    @NotNull
    private static Map<String, Object> estruturaDTOToJson(Page<Object[]> objects, int draw) {

        List<ProdutoDTO> issuesDTOS = objects.stream()
                .map(obj -> {
                    try {
                        return new ProdutoDTO(obj);
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

        Map<String, Object> json = new HashMap<>();
        json.put("draw", draw);
        json.put("recordsTotal", objects.getTotalElements());
        json.put("recordsFiltered", objects.getTotalElements());
        json.put("data", issuesDTOS);

        return json;
    }


    private Pageable pagination(HttpServletRequest request) {
        int start = Integer.parseInt(request.getParameter("start"));
        int length = Integer.parseInt(request.getParameter("length"));

        int current = currentPage(start, length);

        String column = columnName(request);
        Sort.Direction direction = orderBy(request);
        return PageRequest.of(current, length, direction, column);
    }

    private Sort.Direction orderBy(HttpServletRequest request) {
        String order = request.getParameter("order[0][dir]");
        Sort.Direction sort = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("desc")) {
            sort = Sort.Direction.DESC;
        }
        return sort;
    }

    private String columnName(HttpServletRequest request) {
        int iCol = Integer.parseInt(request.getParameter("order[0][column]"));
        return cols[iCol];
    }

    private int currentPage(int start, int length) {
        return start / length;
    }

    public List<Produto> listaProdutos() {
        return produtoDAO.findAll();
    }

    public Produto BuscaProdutoBySku(String sku) {
        List<Produto> produtos = produtoDAO.findAll();
        return produtos.stream().filter(s -> s.getSku().equals(sku)).findFirst().orElse(null);
    }

    @Override
    public Produto AtualizaProduto(String produtoid, AtualizarProdutoRequest ProdutoRequest) {
        var produto = produtoDAO.findById(produtoid);
        if (produtoid != null) {

        }
        return null;
    }

}
