package br.com.systemmanualdigital.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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

    @NotBlank
    @NotNull
    private Double posicaoX;

    @NotBlank
    @NotNull
    private Double posicaoY;

    @NotBlank
    @NotNull
    private Integer pagina;

    @ManyToOne
    @JoinColumn(name = "documento_id")
    private Documento documento;

    public Campo() {
    }

    public Campo(Long id, String nome, String conteudo, Double posicaoX, Double posicaoY, Integer pagina, Documento documento) {
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

    public Double getPosicaoX() {
        return posicaoX;
    }

    public void setPosicaoX(Double posicaoX) {
        this.posicaoX = posicaoX;
    }

    public Double getPosicaoY() {
        return posicaoY;
    }

    public void setPosicaoY(Double posicaoY) {
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
