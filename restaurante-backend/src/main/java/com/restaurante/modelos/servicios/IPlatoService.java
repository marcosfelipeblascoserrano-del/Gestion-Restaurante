package com.restaurante.modelos.servicios;

import com.restaurante.modelos.entidades.Plato;
import java.util.List;

public interface IPlatoService {
    List<Plato> obtenerPlatos();

    Plato agregarPlato(Plato plato);
}
