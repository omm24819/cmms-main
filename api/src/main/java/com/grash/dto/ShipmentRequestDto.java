package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentRequestDto {

    private String productUid;

    private String originAddress;

    private String destinationAddress;

    private Long vehicleId;

    private Long driverId;

    private Double currentLatitude;

    private Double currentLongitude;

    private String shipmentStatus;
}