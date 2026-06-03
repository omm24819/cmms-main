package com.grash.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManufacturingLogisticsTrailResponseDto {

    private Long id;

    private String logUid;

    private String transferDateTime;

    private String movementType;

    private String sourceWarehouse;

    private String destinationWarehouse;

    private Double quantityToTransfer;

    private String handledByOperator;

    private String status;

    private String remarks;

    private List<ManufacturingLogisticsTrailAttachmentDto> attachments;
}