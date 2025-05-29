package br.com.systemmanualdigital.domains.doc;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "campos")
public class Campo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_campo")
    private Long id;

    @NotBlank
    @NotNull
    private String nome;

    @NotBlank
    @NotNull
    private String conteudo;

    @NotNull
    private BigDecimal posicaoX;

    @NotNull
    private BigDecimal posicaoY;

    @NotNull
    private Integer pagina;

    @ManyToOne
    @JoinColumn(name = "documento_id")
    private Documento documento;

    public Campo() {
    }

    public Campo(Long id, String nome, String conteudo, BigDecimal posicaoX, BigDecimal posicaoY, Integer pagina, Documento documento) {
        this.id = id;
        this.nome = nome;
        this.conteudo = conteudo;
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.pagina = pagina;
        this.documento = documento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public BigDecimal getPosicaoX() {
        return posicaoX;
    }

    public void setPosicaoX(BigDecimal posicaoX) {
        this.posicaoX = posicaoX;
    }

    public BigDecimal getPosicaoY() {
        return posicaoY;
    }

    public void setPosicaoY(BigDecimal posicaoY) {
        this.posicaoY = posicaoY;
    }

    public Integer getPagina() {
        return pagina;
    }

    public void setPagina(Integer pagina) {
        this.pagina = pagina;
    }

    public Documento getDocumento() {
        return documento;
    }

    public void setDocumento(Documento documento) {
        this.documento = documento;
    }
}
