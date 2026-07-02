package com.restaurante.modelos.dto;

public class SlotDisponibilidadDTO {
    private String slot;
    private long mesasLibres;

    public SlotDisponibilidadDTO() {
    }

    public SlotDisponibilidadDTO(String slot, long mesasLibres) {
        this.slot = slot;
        this.mesasLibres = mesasLibres;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public long getMesasLibres() {
        return mesasLibres;
    }

    public void setMesasLibres(long mesasLibres) {
        this.mesasLibres = mesasLibres;
    }
}
