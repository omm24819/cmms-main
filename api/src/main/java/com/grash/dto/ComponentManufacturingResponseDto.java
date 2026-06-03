package com.grash.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentManufacturingResponseDto {

    private Long id;

    private String logUid;

    private String componentSerial;

    private String componentName;

    private String associatedProductUid;

    private String associatedProductName;

    private String pcbVersion;

    private String cadVersion;

    private String bomVersion;

    private String revision;

    private LocalDate manufacturingDate;

    private String manufacturingTime;

    private String operatorId;

    private String machineId;

    private String functionalTest;

    private String calibrationResult;

    private String packagingStatus;

    private String remarks;

    private List<ComponentManufacturingAttachmentDto> attachments;
}