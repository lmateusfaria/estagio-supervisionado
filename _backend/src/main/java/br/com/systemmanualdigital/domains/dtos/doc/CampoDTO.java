package br.com.systemmanualdigital.domains.dtos.doc;

import br.com.systemmanualdigital.domains.doc.Campo;
import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.enums.StatusDocumento;

import java.math.BigDecimal;
import java.util.List;

public class CampoDTO {

    private Long id;
    private String nome;
    private String conteudo;
    private BigDecimal posicaoX;
    private BigDecimal posicaoY;
    private Integer pagina;
    private Documento documento;

    public CampoDTO() {
    }

    public CampoDTO(Campo campo) {
        this.id = campo.getId();
        this.nome = campo.getNome();
        this.conteudo = campo.getConteudo();
        this.posicaoX = campo.getPosicaoX();
        this.posicaoY = campo.getPosicaoY();
        this.pagina = campo.getPagina();
        this.documento = campo.getDocumento();
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
