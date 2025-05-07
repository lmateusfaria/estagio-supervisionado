package br.com.systemmanualdigital.domains.enums;

public enum TipoUsuario {
    ADMINISTRADOR(0,"ADMINISTRADOR"),
    GESTOR(1,"GESTOR"),
    COLABORADOR(2,"COLABORADOR");

    private Integer id;
    private String tipoUsuario;

    TipoUsuario() {
    }

    TipoUsuario(Integer id, String tipoUsuario) {
        this.id = id;
        this.tipoUsuario = tipoUsuario;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public static TipoUsuario toEnum(Integer id) {
        if (id == null) return null;
        for (TipoUsuario x : TipoUsuario.values()) {
            if (id.equals(x.getId())) {
                return x;
            }
        }
        throw new IllegalArgumentException("Status inválido");
    }

}
