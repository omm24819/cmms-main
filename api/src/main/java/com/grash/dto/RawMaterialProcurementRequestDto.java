    package com.grash.dto;

    import lombok.*;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class RawMaterialProcurementRequestDto {

        private String status;

        private String poNumber;

        private LocalDate poDate;

        private String supplierVendorName;

        private String supplierCode;

        private String invoiceNumber;

        private LocalDate invoiceDate;

        private String currency;

        private String paymentTerms;

        private String materialName;

        private String materialCategory;

        private String materialSpecification;

        private String hsnSacCode;

        private String uom;

        private Double quantityPurchased;

        private BigDecimal unitPrice;

        private BigDecimal totalAmount;

        private String grnNumber;

        private LocalDate grnDate;

        private Double receivedQuantity;

        private String warehouseLocation;

        private String receivedBy;

        private String inspectionStatus;

        private String inspectedBy;

        private LocalDate inspectionDate;

        private String complianceCertificate;

        private String materialSpecificationDocument;

        private LocalDate expiryDate;

        private String shelfLife;

        private String materialStatus;

        private String rejectionReason;

        private String remarks;

        private BigDecimal taxableAmount;

        private Double taxPercentage;

        private BigDecimal taxAmount;

        private BigDecimal freightCharges;

        private BigDecimal otherCharges;

        private BigDecimal finalAmount;
    }