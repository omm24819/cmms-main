package com.grash.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingResponseDto {

    private Long id;

    private Long shipmentId;

    private Double latitude;

    private Double longitude;

    private String trackingStatus;

    private String locationAddress;

    private Double speed;

    private Double distanceRemaining;

    private LocalDateTime trackedAt;

    private LocalDateTime createdAt;
}