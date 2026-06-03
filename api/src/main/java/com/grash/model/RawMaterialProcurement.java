package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "raw_material_procurement_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RawMaterialProcurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logUid;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // PURCHASE INFORMATION

    private String poNumber;

    private LocalDate poDate;

    private String supplierVendorName;

    private String supplierCode;

    private String invoiceNumber;

    private LocalDate invoiceDate;

    private String currency;

    private String paymentTerms;

    // MATERIAL DETAILS

    private String materialName;

    private String materialCategory;

    private String materialSpecification;

    private String hsnSacCode;

    private String uom;

    private Double quantityPurchased;

    private BigDecimal unitPrice;

    private BigDecimal totalAmount;

    // RECEIPT & INSPECTION

    private String grnNumber;

    private LocalDate grnDate;

    private Double receivedQuantity;

    private String warehouseLocation;

    private String receivedBy;

    private String inspectionStatus;

    private String inspectedBy;

    private LocalDate inspectionDate;

    // ADDITIONAL INFORMATION

    private String complianceCertificate;

    private String materialSpecificationDocument;

    private LocalDate expiryDate;

    private String shelfLife;

    private String materialStatus;

    private String rejectionReason;

    @Column(length = 3000)
    private String remarks;

    // COST & ACCOUNTING

    private BigDecimal taxableAmount;

    private Double taxPercentage;

    private BigDecimal taxAmount;

    private BigDecimal freightCharges;

    private BigDecimal otherCharges;

    private BigDecimal finalAmount;

    @OneToMany(
            mappedBy = "procurement",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProcurementAttachment> attachments;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}