package com.restaurante.modelos.servicios;

import com.restaurante.modelos.entidades.Restaurante;

public interface IRestauranteService {
    Restaurante obtenerConfiguracion();
    Restaurante actualizarConfiguracion(Restaurante restaurante);
}
