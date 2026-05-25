package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Schema(description = "DTO for updating a Product Lifecycle Log record")
public class ProductLifecyclePatchDTO {
    private String productUid;
    private String productName;
    private String name;
    private String productCategory;
    private String category;
    private String subcategory;
    private String description;
    private String productSerialNumber;
    private String serialNumber;
    private String productVersion;
    private String bomVersion;
    private String manufacturingBatchId;
    private LocalDate manufacturingDate;
    private LocalDate assemblyDate;
    private String qcStatus;
    private String productStatus;
    private String status;
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

    @Email(message = "Email must be valid")
    private String email;

    private String imageUrl;
    private String qrValue;
    private Boolean draft;

    private List<ProductLifecycleAttachmentDTO> attachments;
    private List<ProductLifecycleEventDTO> masterLog;
    private List<ProductLifecycleEventDTO> logisticsTrail;
    private List<ProductLifecycleEventDTO> maintenanceHistory;
    private List<ProductLifecycleDocumentDTO> documents;
    private List<ProductLifecycleMetricDTO> digitalTwinMetrics;
    private List<ProductLifecycleEventDTO> auditTrail;
}
