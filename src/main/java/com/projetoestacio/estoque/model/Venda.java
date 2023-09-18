package com.projetoestacio.estoque.model;

import com.projetoestacio.estoque.model.enums.StatusVendaEmum;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Table(name = "venda")
public class Venda{

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;


    /*@ManyToMany
    @JoinColumn(name = "produto")
    private ProdutoModel produtoModel;*/

    private Date datavenda;

    private StatusVendaEmum statusVendaEnum;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /*public ProdutoModel getProdutoModel() {
        return produtoModel;
    }

    public void setProdutoModel(ProdutoModel produtoModel) {
        this.produtoModel = produtoModel;
    }*/
}
