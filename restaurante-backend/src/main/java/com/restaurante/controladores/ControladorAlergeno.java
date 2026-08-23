package com.restaurante.controladores;

import com.restaurante.modelos.dao.AlergenoDao;
import com.restaurante.modelos.entidades.Alergeno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/alergenos")
public class ControladorAlergeno {

    @Autowired
    private AlergenoDao alergenoDao;

    @GetMapping
    public List<Alergeno> listar() {
        return alergenoDao.findAll();
    }

    @PostMapping
    public ResponseEntity<Alergeno> crear(@RequestBody Alergeno alergeno) {
        return new ResponseEntity<>(alergenoDao.save(alergeno), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        alergenoDao.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}