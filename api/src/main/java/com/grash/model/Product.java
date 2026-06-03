package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String productUid;

    private String productName;

    private String productCategory;

    @Column(unique = true)
    private String productSerialNumber;

    private String productVersion;

    private String bomVersion;

    private String manufacturingBatchId;

    private LocalDate manufacturingDate;

    private LocalDate assemblyDate;

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

    @Column(columnDefinition = "TEXT")
    private String remarks;

    private String assignedCustomer;

    private String installationSite;

    private String locationGps;

    private String contactPerson;

    private String contactNumber;

    private String email;

    private String imageUrl;

    private LocalDate warrantyStartDate;

    private LocalDate warrantyEndDate;

    @OneToMany(mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<ProductAttachment> attachments;

    private LocalDateTime createdAt;
}