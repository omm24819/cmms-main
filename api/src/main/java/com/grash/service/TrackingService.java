package com.grash.service;

import com.grash.dto.TrackingResponseDto;
import com.grash.model.Shipment;
import com.grash.model.TrackingHistory;
import com.grash.repository.ShipmentRepository;
import com.grash.repository.TrackingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackingService {

    private final TrackingHistoryRepository
            trackingHistoryRepository;

    private final ShipmentRepository
            shipmentRepository;

    public TrackingResponseDto addTrackingHistory(
            Long shipmentId,
            Double latitude,
            Double longitude,
            String trackingStatus,
            String locationAddress,
            Double speed,
            Double distanceRemaining
    ) {

        Shipment shipment =
                shipmentRepository.findById(shipmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Shipment not found"
                                )
                        );

        shipment.setCurrentLatitude(latitude);

        shipment.setCurrentLongitude(longitude);

        shipmentRepository.save(shipment);

        TrackingHistory trackingHistory =
                TrackingHistory.builder()
                        .shipment(shipment)
                        .latitude(latitude)
                        .longitude(longitude)
                        .trackingStatus(trackingStatus)
                        .locationAddress(locationAddress)
                        .speed(speed)
                        .distanceRemaining(distanceRemaining)
                        .trackedAt(LocalDateTime.now())
                        .build();

        TrackingHistory savedTracking =
                trackingHistoryRepository
                        .save(trackingHistory);

        return mapToResponse(savedTracking);
    }

    public List<TrackingResponseDto>
    getTrackingHistoryByShipment(
            Long shipmentId
    ) {

        return trackingHistoryRepository
                .findByShipmentId(shipmentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TrackingResponseDto
    mapToResponse(
            TrackingHistory trackingHistory
    ) {

        return TrackingResponseDto.builder()
                .id(trackingHistory.getId())
                .shipmentId(
                        trackingHistory.getShipment()
                                .getId()
                )
                .latitude(
                        trackingHistory.getLatitude()
                )
                .longitude(
                        trackingHistory.getLongitude()
                )
                .trackingStatus(
                        trackingHistory.getTrackingStatus()
                )
                .locationAddress(
                        trackingHistory.getLocationAddress()
                )
                .speed(
                        trackingHistory.getSpeed()
                )
                .distanceRemaining(
                        trackingHistory.getDistanceRemaining()
                )
                .trackedAt(
                        trackingHistory.getTrackedAt()
                )
                .createdAt(
                        trackingHistory.getCreatedAt()
                )
                .build();
    }
}