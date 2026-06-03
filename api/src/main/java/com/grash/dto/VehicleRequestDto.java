package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequestDto {

    private String vehicleNumber;

    private String vehicleType;

    private String vehicleBrand;

    private String vehicleModel;

    private Double fuelLevel;

    private Integer carryingCapacity;

    private Double currentLatitude;

    private Double currentLongitude;

    private String vehicleStatus;
}