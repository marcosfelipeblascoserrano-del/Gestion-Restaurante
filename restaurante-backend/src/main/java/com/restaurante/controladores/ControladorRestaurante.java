package com.restaurante.controladores;

import com.restaurante.modelos.entidades.Restaurante;
import com.restaurante.modelos.servicios.IRestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/restaurante")
public class ControladorRestaurante {

    @Autowired
    private IRestauranteService restauranteService;

    @GetMapping
    public ResponseEntity<Restaurante> getConfiguracion() {
        return ResponseEntity.ok(restauranteService.obtenerConfiguracion());
    }

    @PutMapping
    public ResponseEntity<Restaurante> actualizarConfiguracion(@RequestBody Restaurante restaurante) {
        return ResponseEntity.ok(restauranteService.actualizarConfiguracion(restaurante));
    }
}
