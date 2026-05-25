package com.grash.controller;

import com.grash.dto.CreateInventoryPartRequest;
import com.grash.dto.InventoryPartResponse;
import com.grash.service.InventoryPartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
public class InventoryPartController {

    private final InventoryPartService inventoryPartService;

    @PostMapping("/add")
    public ResponseEntity<InventoryPartResponse> createPart(
            @RequestBody CreateInventoryPartRequest request
    ) {

        InventoryPartResponse response =
                inventoryPartService.createPart(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<InventoryPartResponse> getPartByBarcode(
            @PathVariable String barcode
    ) {

        InventoryPartResponse response =
                inventoryPartService.getPartByBarcode(barcode);

        return ResponseEntity.ok(response);
    }

    // GET ALL PARTS
    @GetMapping("/getAllParts")
    public ResponseEntity<List<InventoryPartResponse>> getAllParts() {

        List<InventoryPartResponse> response =
                inventoryPartService.getAllParts();

        return ResponseEntity.ok(response);
    }
}