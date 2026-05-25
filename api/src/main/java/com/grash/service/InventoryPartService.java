package com.grash.service;

import com.grash.dto.CreateInventoryPartRequest;
import com.grash.dto.InventoryPartResponse;
import com.grash.model.InventoryPart;
import com.grash.repository.InventoryPartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryPartService {

    private final InventoryPartRepository inventoryPartRepository;

    public InventoryPartResponse createPart(CreateInventoryPartRequest request) {

        InventoryPart part = InventoryPart.builder()
                .partName(request.getPartName())
                .description(request.getDescription())
                .manufacturer(request.getManufacturer())
                .category(request.getCategory())
                .brand(request.getBrand())
                .stockQuantity(request.getStockQuantity())
                .minStockLevel(request.getMinStockLevel())
                .maxStockLevel(request.getMaxStockLevel())
                .unit(request.getUnit())
                .unitPrice(request.getUnitPrice())
                .currency(request.getCurrency())
                .warehouseName(request.getWarehouseName())
                .rackNumber(request.getRackNumber())
                .shelfNumber(request.getShelfNumber())
                .binNumber(request.getBinNumber())
                .location(request.getLocation())
                .supplierName(request.getSupplierName())
                .supplierContact(request.getSupplierContact())
                .createdBy(request.getCreatedBy())
                .build();

        InventoryPart savedPart = inventoryPartRepository.save(part);

        return mapToResponse(savedPart);
    }

    public InventoryPartResponse getPartByBarcode(String barcode) {

        InventoryPart part = inventoryPartRepository.findByBarcode(barcode)
                .orElseThrow(() -> new RuntimeException("Part not found"));

        return mapToResponse(part);
    }

    private InventoryPartResponse mapToResponse(InventoryPart part) {

        return InventoryPartResponse.builder()
                .id(part.getId())
                .partName(part.getPartName())
                .description(part.getDescription())
                .partNumber(part.getPartNumber())
                .barcode(part.getBarcode())
                .manufacturer(part.getManufacturer())
                .category(part.getCategory())
                .brand(part.getBrand())
                .stockQuantity(part.getStockQuantity())
                .minStockLevel(part.getMinStockLevel())
                .maxStockLevel(part.getMaxStockLevel())
                .unit(part.getUnit())
                .unitPrice(part.getUnitPrice())
                .currency(part.getCurrency())
                .warehouseName(part.getWarehouseName())
                .rackNumber(part.getRackNumber())
                .shelfNumber(part.getShelfNumber())
                .binNumber(part.getBinNumber())
                .location(part.getLocation())
                .supplierName(part.getSupplierName())
                .supplierContact(part.getSupplierContact())
                .status(part.getStatus())
                .active(part.getActive())
                .createdBy(part.getCreatedBy())
                .updatedBy(part.getUpdatedBy())
                .createdAt(part.getCreatedAt())
                .updatedAt(part.getUpdatedAt())
                .build();
    }

    public List<InventoryPartResponse> getAllParts() {

        List<InventoryPart> parts = inventoryPartRepository.findAll();

        return parts.stream()
                .map(this::mapToResponse)
                .toList();
    }
}