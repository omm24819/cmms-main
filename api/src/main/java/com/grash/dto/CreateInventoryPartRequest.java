package com.grash.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateInventoryPartRequest {

    // Basic Details
    private String partName;
    private String description;
    private String manufacturer;
    private String category;
    private String brand;

    // Inventory Details
    private Integer stockQuantity;
    private Integer minStockLevel;
    private Integer maxStockLevel;
    private String unit;
    private BigDecimal unitPrice;
    private String currency;

    // Storage Details
    private String warehouseName;
    private String rackNumber;
    private String shelfNumber;
    private String binNumber;
    private String location;

    // Supplier Details
    private String supplierName;
    private String supplierContact;

    // Audit
    private String createdBy;
}