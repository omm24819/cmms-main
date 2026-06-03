package com.grash.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentManufacturingRequestDto {

    private String componentSerial;
    private String componentName;

    private String associatedProductUid;

    private String pcbVersion;
    private String cadVersion;
    private String bomVersion;
    private String revision;

    private LocalDate manufacturingDate;
    private String manufacturingTime;
    private String operatorId;
    private String machineId;
    private String smtBatchId;
    private String solderPasteBatch;
    private String firmwareLoaded;
    private String testJig;

    private String burnInStatus;
    private String functionalTest;
    private String calibrationResult;
    private String testEquipment;
    private String burnInDuration;
    private String voltageCheck;
    private String currentCheck;
    private String frequencyCheck;

    private Integer reworkCount;
    private String reworkDetails;
    private String scrapStatus;
    private String scrapReason;

    private String qcInspector;
    private String qcTimestamp;
    private String packagingStatus;
    private String remarks;

    private String notes;
    private String internalReference;
}