package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "component_manufacturing_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentManufacturingLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String logUid;

    private String componentSerial;

    private String componentName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product associatedProduct;

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

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String internalReference;

    @OneToMany(
            mappedBy = "componentManufacturingLog",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ComponentManufacturingAttachment> attachments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}