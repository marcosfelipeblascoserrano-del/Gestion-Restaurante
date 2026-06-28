package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.PlatoDao;
import com.restaurante.modelos.dao.IngredienteDao;
import com.restaurante.modelos.entidades.Plato;
import com.restaurante.modelos.entidades.Ingrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlatoServiceImpl implements IPlatoService {

    @Autowired
    private PlatoDao platoDao;

    @Autowired
    private IngredienteDao ingredienteDao;

    @Override
    @Transactional(readOnly = true)
    public List<Plato> obtenerPlatos() {
        return platoDao.findAll();
    }

    @Override
    @Transactional
    public Plato agregarPlato(Plato plato) {
        return platoDao.save(plato);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ingrediente> obtenerIngredientesPorPlato(Long platoId) {
        return ingredienteDao.findByPlatoId(platoId);
    }
}
