package com.grash.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssemblyLineTrackingRequestDto {

    private String productionOrderId;

    private String associatedProductUid;

    private String bomVersion;

    private String assemblyLine;

    private String assemblyStation;

    private String shift;

    private LocalDate assemblyDate;

    private String operatorEmployee;

    private String startTime;

    private String endTime;

    private Integer totalCycleTime;

    private String shiftIncharge;

    private String teamMembers;

    private Integer unitsStarted;

    private Integer unitsCompleted;

    private String assemblySopVersion;

    private String toolsEquipmentUsed;

    private String toolCalibrationStatus;

    private String torqueLogs;

    private String assemblyVerification;

    private String imageCaptureStatus;

    private String videoCaptureStatus;

    private String iotSensorLogs;

    private Integer goodUnits;

    private Integer rejectedUnits;

    private Integer reworkUnits;

    private String defectCode;

    private Double productionYield;

    private Double cycleTimePerUnit;

    private Integer downtimeMinutes;

    private String downtimeReason;

    private Double energyConsumption;

    private Double voltage;

    private Double temperature;

    private Double humidity;

    private String ambientCondition;

    private String remarks;

    private String approvedBy;

    private String approvalTime;

    private String signature;
}