package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assembly_line_tracking_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssemblyLineTrackingLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String logUid;

    /*
     * Section 1
     * Work Order & Line Information
     */

    private String productionOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product associatedProduct;

    private String bomVersion;

    private String assemblyLine;

    private String assemblyStation;

    private String shift;

    private LocalDate assemblyDate;

    /*
     * Section 2
     * Operator & Time Details
     */

    private String operatorEmployee;

    private String startTime;

    private String endTime;

    private Integer totalCycleTime;

    private String shiftIncharge;

    private String teamMembers;

    private Integer unitsStarted;

    private Integer unitsCompleted;

    /*
     * Section 3
     * Assembly Process Details
     */

    private String assemblySopVersion;

    private String toolsEquipmentUsed;

    private String toolCalibrationStatus;

    private String torqueLogs;

    private String assemblyVerification;

    private String imageCaptureStatus;

    private String videoCaptureStatus;

    private String iotSensorLogs;

    /*
     * Section 4
     * Production & Quality Metrics
     */

    private Integer goodUnits;

    private Integer rejectedUnits;

    private Integer reworkUnits;

    private String defectCode;

    private Double productionYield;

    private Double cycleTimePerUnit;

    private Integer downtimeMinutes;

    private String downtimeReason;

    /*
     * Section 5
     * Energy & Environmental Data
     */

    private Double energyConsumption;

    private Double voltage;

    private Double temperature;

    private Double humidity;

    private String ambientCondition;

    /*
     * Section 6
     * Remarks & Approval
     */

    @Column(columnDefinition = "TEXT")
    private String remarks;

    private String approvedBy;

    private String approvalTime;

    private String signature;

    /*
     * Attachments
     */

    @OneToMany(
            mappedBy = "assemblyLineTrackingLog",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AssemblyLineTrackingAttachment> attachments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}