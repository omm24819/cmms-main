package com.grash.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class InventoryPartResponse {

    private Long id;

    private String partName;
    private String description;

    private String partNumber;
    private String barcode;

    private String manufacturer;
    private String category;
    private String brand;

    private Integer stockQuantity;
    private Integer minStockLevel;
    private Integer maxStockLevel;

    private String unit;

    private BigDecimal unitPrice;
    private String currency;

    private String warehouseName;
    private String rackNumber;
    private String shelfNumber;
    private String binNumber;
    private String location;

    private String supplierName;
    private String supplierContact;

    private String status;
    private Boolean active;

    private String createdBy;
    private String updatedBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}