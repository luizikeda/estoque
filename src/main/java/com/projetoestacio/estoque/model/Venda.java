package com.projetoestacio.estoque.model;

import com.projetoestacio.estoque.model.enums.TipoPagamentoEmum;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "venda")
public class Venda{

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;


    @ManyToMany
    @JoinTable(
            name = "produto_venda",
            joinColumns = @JoinColumn(name = "venda_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private Set<Produto> produtos = new HashSet<>();

    private Date datavenda;

    private TipoPagamentoEmum TipoPagamentoEnum;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public void adicionarProduto(Produto produto, int quantidade) {
        produto.setEstoque(String.valueOf(quantidade));
        produtos.add(produto);
    }

    public void removerProduto(Produto produto) {
        produtos.remove(produto);

    }
}
