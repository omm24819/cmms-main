package com.grash.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDto {

    private Long id;

    private String productUid;
    private String productName;
    private String productCategory;
    private String productSerialNumber;
    private String productVersion;
    private String bomVersion;
    private String manufacturingBatchId;
    private String manufacturingDate;
    private String assemblyDate;

    // NEW FIELDS
    private String warrantyStartDate;
    private String warrantyEndDate;

    private String qcStatus;
    private String productStatus;
    private String lifecycleStage;
    private String modelNumber;
    private String partNumber;
    private String macAddress;
    private String imeiModuleId;
    private String hardwareVersion;
    private String firmwareVersion;
    private String rfidTagId;
    private String digitalTwinLink;
    private String remarks;
    private String assignedCustomer;
    private String installationSite;
    private String locationGps;
    private String contactPerson;
    private String contactNumber;
    private String category;
    private String email;
    private String imageUrl;
    private String createdAt;

    private List<ProductAttachmentResponseDto> attachments;
}