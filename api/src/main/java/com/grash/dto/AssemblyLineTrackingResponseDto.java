package com.grash.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssemblyLineTrackingResponseDto {

    private Long id;

    private String logUid;

    private String productionOrderId;

    private String associatedProductUid;

    private String associatedProductName;

    private String assemblyLine;

    private String assemblyStation;

    private String shift;

    private LocalDate assemblyDate;

    private String operatorEmployee;

    private Integer unitsStarted;

    private Integer unitsCompleted;

    private Integer goodUnits;

    private Integer rejectedUnits;

    private Integer reworkUnits;

    private Double productionYield;

    private String approvedBy;

    private String remarks;

    private List<AssemblyLineTrackingAttachmentDto> attachments;
}