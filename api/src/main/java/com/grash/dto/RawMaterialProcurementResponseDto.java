package com.grash.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RawMaterialProcurementResponseDto {

    private Long id;

    private String logUid;

    private String status;

    private String poNumber;

    private String supplierVendorName;

    private String materialName;

    private BigDecimal finalAmount;

    private Double quantityPurchased;

    private BigDecimal unitPrice;

    private String inspectionStatus;

    private String materialStatus;

    private String remarks;

    private LocalDateTime createdAt;

    private List<AttachmentResponseDto> attachments;
}