package com.restaurante.modelos.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReservaRequestDTO {

    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String telefono;

    @NotNull
    @FutureOrPresent
    private LocalDate fecha;

    @NotBlank
    private String slot;

    @NotNull
    @Min(1)
    private Integer comensales;

    public ReservaRequestDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public Integer getComensales() {
        return comensales;
    }

    public void setComensales(Integer comensales) {
        this.comensales = comensales;
    }
}
