package com.grash.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverResponseDto {

    private Long id;

    private String driverUid;

    private String fullName;

    private String phone;

    private String email;

    private String licenseNumber;

    private String licenseType;

    private String availabilityStatus;

    private Double currentLatitude;

    private Double currentLongitude;

    private LocalDateTime lastActiveAt;

    private LocalDateTime createdAt;
}