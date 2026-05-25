package com.grash.model;

import com.grash.model.abstracts.CompanyAudit;
import com.grash.model.enums.ProductLifecycleStage;
import com.grash.model.enums.ProductLifecycleStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(
        name = "product_lifecycle",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_product_lifecycle_company_public_id", columnNames = {"company_id", "public_id"}),
                @UniqueConstraint(name = "uk_product_lifecycle_company_product_uid", columnNames = {"company_id", "product_uid"})
        },
        indexes = {
                @Index(name = "idx_product_lifecycle_company", columnList = "company_id"),
                @Index(name = "idx_product_lifecycle_status", columnList = "status"),
                @Index(name = "idx_product_lifecycle_stage", columnList = "lifecycle_stage")
        }
)
@Schema(description = "Product lifecycle master record")
public class ProductLifecycle extends CompanyAudit {

    @Column(name = "public_id")
    private String publicId;

    @NotBlank
    @Column(name = "product_uid", nullable = false)
    private String productUid;

    @NotBlank
    @Column(nullable = false)
    private String name;

    private String category;
    private String subcategory;

    @Column(length = 10000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductLifecycleStatus status = ProductLifecycleStatus.MANUFACTURING;

    private String serialNumber;
    private String productVersion;
    private String bomVersion;
    private String manufacturingBatchId;
    private LocalDate manufacturingDate;
    private LocalDate assemblyDate;
    private String qcStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductLifecycleStage lifecycleStage = ProductLifecycleStage.DESIGN;

    private String modelNumber;
    private String partNumber;
    private String macAddress;
    private String imeiModuleId;
    private String hardwareVersion;
    private String firmwareVersion;
    private String rfidTagId;
    private String digitalTwinLink;

    @Column(length = 10000)
    private String remarks;

    private String assignedCustomer;
    private String installationSite;
    private String locationGps;
    private String contactPerson;
    private String contactNumber;
    private String email;
    private String imageUrl;

    @Column(length = 10000)
    private String qrValue;

    private boolean draft = false;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_attachments", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleAttachment> attachments = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_master_log", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleEvent> masterLog = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_logistics_trail", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleEvent> logisticsTrail = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_maintenance_history", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleEvent> maintenanceHistory = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_documents", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleDocument> documents = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_audit_trail", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleEvent> auditTrail = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_lifecycle_digital_twin_metrics", joinColumns = @JoinColumn(name = "product_lifecycle_id"))
    @OrderColumn(name = "sort_order")
    private List<ProductLifecycleMetric> digitalTwinMetrics = new ArrayList<>();
}
