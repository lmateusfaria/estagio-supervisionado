package br.com.systemmanualdigital.domains.enums;

public enum StatusDocumento {
    NAOPREENCHIDO(0,"NAOPREENCHIDO"),
    EMANDAMENTO(1,"EMANDAMENTO"),
    FINALIZADO(2,"FINALIZADO"),
    ALTERADO(3,"ALTERADO");


    private Integer id;
    private String statusDocumento;

    StatusDocumento() {
    }

    StatusDocumento(Integer id, String statusDocumento) {
        this.id = id;
        this.statusDocumento = statusDocumento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatusDocumento() {
        return statusDocumento;
    }

    public void setStatusDocumento(String statusDocumento) {
        this.statusDocumento = statusDocumento;
    }

    public static StatusDocumento toEnum(Integer id) {
        if (id == null) return null;
        for (StatusDocumento x : StatusDocumento.values()) {
            if (id.equals(x.getId())) {
                return x;
            }
        }
        throw new IllegalArgumentException("Status inválido");
    }

}
