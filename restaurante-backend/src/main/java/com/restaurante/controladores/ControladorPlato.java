package com.restaurante.controladores;

import com.restaurante.modelos.entidades.Plato;
import com.restaurante.modelos.entidades.Ingrediente;
import com.restaurante.modelos.servicios.IPlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/platos")
public class ControladorPlato {

    @Autowired
    private IPlatoService platoService;

    @GetMapping
    public ResponseEntity<List<Plato>> listar() {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(1, java.util.concurrent.TimeUnit.HOURS)
                        .cachePublic())
                .body(platoService.obtenerPlatos());
    }

    @PostMapping
    public ResponseEntity<Plato> crear(@RequestBody Plato plato) {
        Plato nuevoPlato = platoService.agregarPlato(plato);
        return new ResponseEntity<>(nuevoPlato, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ingredientes")
    public ResponseEntity<List<Ingrediente>> listarIngredientes(@PathVariable Long id) {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(1, java.util.concurrent.TimeUnit.HOURS)
                        .cachePublic())
                .body(platoService.obtenerIngredientesPorPlato(id));
    }
}
