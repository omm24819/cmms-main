package com.grash.controller;

import com.grash.dto.VehicleRequestDto;
import com.grash.dto.VehicleResponseDto;
import com.grash.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleResponseDto>
    createVehicle(
            @RequestBody
            VehicleRequestDto requestDto
    ) {

        return ResponseEntity.ok(
                vehicleService.createVehicle(
                        requestDto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponseDto>>
    getAllVehicles() {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDto>
    getVehicleById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                vehicleService.getVehicleById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<VehicleResponseDto>
    updateVehicleStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                vehicleService.updateVehicleStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteVehicle(
            @PathVariable Long id
    ) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.ok(
                "Vehicle deleted successfully"
        );
    }
}