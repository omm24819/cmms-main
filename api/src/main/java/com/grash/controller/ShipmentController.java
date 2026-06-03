package com.grash.controller;

import com.grash.dto.ShipmentRequestDto;
import com.grash.dto.ShipmentResponseDto;
import com.grash.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping
    public ResponseEntity<ShipmentResponseDto>
    createShipment(
            @RequestBody
            ShipmentRequestDto requestDto
    ) {

        return ResponseEntity.ok(
                shipmentService.createShipment(
                        requestDto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<ShipmentResponseDto>>
    getAllShipments() {

        return ResponseEntity.ok(
                shipmentService.getAllShipments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipmentResponseDto>
    getShipmentById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                shipmentService.getShipmentById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ShipmentResponseDto>
    updateShipmentStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                shipmentService.updateShipmentStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteShipment(
            @PathVariable Long id
    ) {

        shipmentService.deleteShipment(id);

        return ResponseEntity.ok(
                "Shipment deleted successfully"
        );
    }
}