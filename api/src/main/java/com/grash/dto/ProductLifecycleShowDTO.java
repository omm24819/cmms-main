package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Schema(description = "DTO for Product Lifecycle Log list and details responses")
public class ProductLifecycleShowDTO {
    @Schema(description = "Frontend display ID, for example PL-1001")
    private String id;

    @Schema(description = "Internal database ID")
    private Long databaseId;

    private Long createdBy;
    private Long updatedBy;
    private Date createdAt;
    private Date updatedAt;

    private String productUid;
    private String name;
    private String productName;
    private String category;
    private String productCategory;
    private String subcategory;
    private String description;
    private String status;
    private String productStatus;
    private String serialNumber;
    private String productSerialNumber;
    private String productVersion;
    private String bomVersion;
    private String manufacturingBatchId;
    private LocalDate manufacturingDate;
    private LocalDate assemblyDate;
    private String qcStatus;
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
    private String email;
    private String imageUrl;
    private String qrValue;
    private boolean draft;

    private List<ProductLifecycleAttachmentDTO> attachments = new ArrayList<>();
    private List<ProductLifecycleEventDTO> masterLog = new ArrayList<>();
    private List<ProductLifecycleEventDTO> logisticsTrail = new ArrayList<>();
    private List<ProductLifecycleEventDTO> maintenanceHistory = new ArrayList<>();
    private List<ProductLifecycleDocumentDTO> documents = new ArrayList<>();
    private List<ProductLifecycleMetricDTO> digitalTwinMetrics = new ArrayList<>();
    private List<ProductLifecycleEventDTO> auditTrail = new ArrayList<>();
}
