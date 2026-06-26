package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.CategoriaDao;
import com.restaurante.modelos.entidades.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaServiceImpl implements ICategoriaService {

    @Autowired
    private CategoriaDao categoriaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Categoria> obtenerCategorias() {
        return categoriaDao.findAll();
    }
}
