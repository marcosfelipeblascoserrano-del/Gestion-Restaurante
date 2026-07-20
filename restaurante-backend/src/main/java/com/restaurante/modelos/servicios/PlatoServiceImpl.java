package com.restaurante.modelos.servicios;

import com.restaurante.modelos.dao.AlergenoDao;
import com.restaurante.modelos.dao.CategoriaDao;
import com.restaurante.modelos.dao.IngredienteDao;
import com.restaurante.modelos.dao.PlatoDao;
import com.restaurante.modelos.entidades.Alergeno;
import com.restaurante.modelos.entidades.Categoria;
import com.restaurante.modelos.entidades.Ingrediente;
import com.restaurante.modelos.entidades.Plato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlatoServiceImpl implements IPlatoService {

    @Autowired
    private PlatoDao platoDao;

    @Autowired
    private IngredienteDao ingredienteDao;

    @Autowired
    private CategoriaDao categoriaDao;

    @Autowired
    private AlergenoDao alergenoDao;

    @Override
    @Transactional(readOnly = true)
    public List<Plato> obtenerPlatos() {
        return platoDao.findAll();
    }

    @Override
    @Transactional
    public Plato agregarPlato(Plato plato) {
        // Resolver categoría
        if (plato.getCategoria() != null && plato.getCategoria().getId() != null) {
            Categoria cat = categoriaDao.findById(plato.getCategoria().getId()).orElse(null);
            plato.setCategoria(cat);
        } else {
            plato.setCategoria(null);
        }
        // Resolver alérgenos
        if (plato.getAlergenos() != null && !plato.getAlergenos().isEmpty()) {
            Set<Alergeno> alergenosResueltos = plato.getAlergenos().stream()
                    .filter(a -> a.getId() != null)
                    .map(a -> alergenoDao.findById(a.getId()).orElse(null))
                    .filter(a -> a != null)
                    .collect(Collectors.toSet());
            plato.setAlergenos(alergenosResueltos);
        } else {
            plato.setAlergenos(new HashSet<>());
        }
        // Los ingredientes no se vinculan en la creación por su relación @ManyToOne
        plato.setIngredientes(null);
        return platoDao.save(plato);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ingrediente> obtenerIngredientesPorPlato(Long platoId) {
        return ingredienteDao.findByPlatoId(platoId);
    }

    @Override
    @Transactional
    public Plato actualizarPlato(Long id, Plato platoActualizado) {
        return platoDao.findById(id).map(plato -> {
            plato.setNombre(platoActualizado.getNombre());
            plato.setPrecio(platoActualizado.getPrecio());
            plato.setDisponible(platoActualizado.getDisponible());
            plato.setImagenUrl(platoActualizado.getImagenUrl());

            // Descripcion (campo nuevo, puede ser null si la entidad no lo tiene aún)
            // plato.setDescripcion(platoActualizado.getDescripcion());

            // Resolver categoría
            if (platoActualizado.getCategoria() != null && platoActualizado.getCategoria().getId() != null) {
                Categoria cat = categoriaDao.findById(platoActualizado.getCategoria().getId()).orElse(null);
                plato.setCategoria(cat);
            } else {
                plato.setCategoria(null);
            }

            // Resolver alérgenos
            if (platoActualizado.getAlergenos() != null && !platoActualizado.getAlergenos().isEmpty()) {
                Set<Alergeno> alergenosResueltos = platoActualizado.getAlergenos().stream()
                        .filter(a -> a.getId() != null)
                        .map(a -> alergenoDao.findById(a.getId()).orElse(null))
                        .filter(a -> a != null)
                        .collect(Collectors.toSet());
                plato.setAlergenos(alergenosResueltos);
            } else {
                plato.setAlergenos(new HashSet<>());
            }

            return platoDao.save(plato);
        }).orElseThrow(() -> new RuntimeException("Plato no encontrado con id " + id));
    }

    @Override
    @Transactional
    public void eliminarPlato(Long id) {
        // 1. Borrar filas de la tabla intermedia plato_alergeno
        platoDao.eliminarAlergenosDePlato(id);
        // 2. Borrar ingredientes asociados al plato
        platoDao.eliminarIngredientesDePlato(id);
        // 3. Borrar el plato (ya sin dependencias)
        platoDao.deleteById(id);
    }
}
