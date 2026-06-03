package com.grash.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponseDto {

    private Long id;

    private String vehicleUid;

    private String vehicleNumber;

    private String vehicleType;

    private String vehicleBrand;

    private String vehicleModel;

    private String vehicleStatus;

    private Double currentLatitude;

    private Double currentLongitude;

    private Double fuelLevel;

    private Integer carryingCapacity;

    private LocalDateTime lastActiveAt;

    private LocalDateTime createdAt;
}