package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.RestauranteDao;
import com.restaurante.modelos.entidades.Restaurante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RestauranteServiceImpl implements IRestauranteService {

    @Autowired
    private RestauranteDao restauranteDao;

    @Override
    @Transactional(readOnly = true)
    public Restaurante obtenerConfiguracion() {
        return restauranteDao.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No hay restaurante configurado"));
    }

    @Override
    @Transactional
    public Restaurante actualizarConfiguracion(Restaurante restauranteActualizado) {
        Restaurante actual = obtenerConfiguracion();
        actual.setNombre(restauranteActualizado.getNombre());
        actual.setDescripcion(restauranteActualizado.getDescripcion());
        actual.setTelefono(restauranteActualizado.getTelefono());
        actual.setDireccion(restauranteActualizado.getDireccion());
        actual.setHoraApertura(restauranteActualizado.getHoraApertura());
        actual.setHoraCierre(restauranteActualizado.getHoraCierre());
        actual.setCapacidadMesas(restauranteActualizado.getCapacidadMesas());
        actual.setLogoUrl(restauranteActualizado.getLogoUrl());
        return restauranteDao.save(actual);
    }
}
