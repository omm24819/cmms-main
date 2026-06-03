package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManufacturingLogisticsTrailRequestDto {

    private String transferDateTime;
    private String movementType;
    private String referenceNumber;
    private String priority;
    private String reasonForTransfer;
    private String materialItemType;
    private String itemProductDetails;

    private String sourceWarehouse;
    private String sourceAreaZone;
    private String sourceBinShelfNo;
    private String sourceBatchLotNo;
    private Double quantityAvailable;
    private String uom;
    private Double quantityToTransfer;
    private String serialBatchRange;

    private String destinationWarehouse;
    private String destinationAreaZone;
    private String destinationBinShelfNo;
    private String expectedUsePurpose;
    private String requiredByDateTime;
    private String linkedWorkOrder;
    private String linkedProductionOrder;
    private String endProduct;

    private String handledByOperator;
    private String movementMethod;
    private String packagingCondition;
    private String transportDeviceVehicle;
    private String packagingContainerId;
    private String sealTagRfid;
    private String conditionOnTransfer;
    private Integer transitDelayMinutes;

    private String checkedBySupervisor;
    private String verificationTime;
    private String status;
    private String remarks;
}