package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingRequestDto {

    private Double latitude;

    private Double longitude;

    private String trackingStatus;

    private String locationAddress;

    private Double speed;

    private Double distanceRemaining;
}