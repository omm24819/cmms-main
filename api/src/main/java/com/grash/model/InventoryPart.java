package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "parts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryPart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Details
    @Column(name = "part_name", nullable = false)
    private String partName;

    @Column(name = "description")
    private String description;

    @Column(name = "part_number", unique = true, nullable = false)
    private String partNumber;

    @Column(name = "barcode", unique = true, nullable = false)
    private String barcode;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    // Inventory Details
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "min_stock_level")
    private Integer minStockLevel;

    @Column(name = "max_stock_level")
    private Integer maxStockLevel;

    @Column(name = "unit")
    private String unit;

    @Column(name = "unit_price", precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "currency")
    private String currency;

    // Storage Details
    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "rack_number")
    private String rackNumber;

    @Column(name = "shelf_number")
    private String shelfNumber;

    @Column(name = "bin_number")
    private String binNumber;

    @Column(name = "location")
    private String location;

    // Supplier Details
    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_contact")
    private String supplierContact;

    // Status
    @Column(name = "status")
    private String status;

    @Column(name = "active")
    private Boolean active;

    // Audit Fields
    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();

        if (this.barcode == null || this.barcode.isEmpty()) {
            this.barcode = "BAR-" + UUID.randomUUID()
                    .toString()
                    .substring(0, 8)
                    .toUpperCase();
        }

        if (this.partNumber == null || this.partNumber.isEmpty()) {
            this.partNumber = "PART-" + UUID.randomUUID()
                    .toString()
                    .substring(0, 6)
                    .toUpperCase();
        }

        if (this.active == null) {
            this.active = true;
        }

        if (this.status == null) {
            this.status = "AVAILABLE";
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}