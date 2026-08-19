package cr.ac.ucr.paraiso.ie.C4H142.practica2.domain;

public class Asignacion {
    private int id;
    private String titulo;
    private String descripcion;
    private String fechaEntrega;
    private boolean completada;

    // Constructor vacío requerido para la deserialización JSON
    public Asignacion() {
    }

    public Asignacion(int id, String titulo, String descripcion,
            String fechaEntrega, boolean completada) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaEntrega = fechaEntrega;
        this.completada = completada;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public boolean isCompletada() {
        return completada;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
    }
}
