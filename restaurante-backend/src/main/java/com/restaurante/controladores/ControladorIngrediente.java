package com.restaurante.controladores;

import com.restaurante.modelos.dao.IngredienteDao;
import com.restaurante.modelos.dao.PlatoDao;
import com.restaurante.modelos.entidades.Ingrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ingredientes")
public class ControladorIngrediente {

    @Autowired
    private IngredienteDao ingredienteDao;

    @Autowired
    private PlatoDao platoDao;

    @GetMapping
    public List<Ingrediente> listar() {
        return ingredienteDao.findAll();
    }

    @PostMapping
    public ResponseEntity<Ingrediente> crear(@RequestBody Map<String, String> body) {
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre(body.get("nombre"));
        return new ResponseEntity<>(ingredienteDao.save(ingrediente), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ingredienteDao.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
