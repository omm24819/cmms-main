package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverRequestDto {

    private String fullName;

    private String phone;

    private String email;

    private String licenseNumber;

    private String licenseType;

    private Double currentLatitude;

    private Double currentLongitude;

    private String availabilityStatus;
}