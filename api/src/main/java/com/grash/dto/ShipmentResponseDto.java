package com.grash.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResponseDto {

    private Long id;

    private String shipmentUid;

    private String productUid;

    private String trackingNumber;

    private String shipmentStatus;

    private String fleetbaseOrderId;

    private String originAddress;

    private String destinationAddress;

    private Double currentLatitude;

    private Double currentLongitude;

    private String vehicleNumber;

    private String driverName;

    private LocalDateTime dispatchedAt;

    private LocalDateTime deliveredAt;

    private LocalDateTime estimatedDeliveryTime;

    private LocalDateTime createdAt;
}