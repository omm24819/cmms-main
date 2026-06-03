package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "manufacturing_logistics_trail_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManufacturingLogisticsTrailLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String logUid;

    // Transfer Information

    private String transferDateTime;
    private String movementType;
    private String referenceNumber;
    private String priority;
    private String reasonForTransfer;
    private String materialItemType;
    private String itemProductDetails;

    // Source Information

    private String sourceWarehouse;
    private String sourceAreaZone;
    private String sourceBinShelfNo;
    private String sourceBatchLotNo;
    private Double quantityAvailable;
    private String uom;
    private Double quantityToTransfer;
    private String serialBatchRange;

    // Destination Information

    private String destinationWarehouse;
    private String destinationAreaZone;
    private String destinationBinShelfNo;
    private String expectedUsePurpose;
    private String requiredByDateTime;
    private String linkedWorkOrder;
    private String linkedProductionOrder;
    private String endProduct;

    // Logistics & Handling Details

    private String handledByOperator;
    private String movementMethod;
    private String packagingCondition;
    private String transportDeviceVehicle;
    private String packagingContainerId;
    private String sealTagRfid;
    private String conditionOnTransfer;
    private Integer transitDelayMinutes;

    // Verification & Approval

    private String checkedBySupervisor;
    private String verificationTime;
    private String status;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @OneToMany(
            mappedBy = "logisticsTrailLog",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ManufacturingLogisticsTrailAttachment> attachments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}