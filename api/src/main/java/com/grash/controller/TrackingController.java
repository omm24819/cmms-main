package com.grash.controller;

import com.grash.dto.TrackingRequestDto;
import com.grash.dto.TrackingResponseDto;
import com.grash.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final TrackingService trackingService;

    @PostMapping("/{shipmentId}")
    public ResponseEntity<TrackingResponseDto>
    addTrackingHistory(

            @PathVariable Long shipmentId,

            @RequestBody
            TrackingRequestDto requestDto
    ) {

        return ResponseEntity.ok(
                trackingService.addTrackingHistory(
                        shipmentId,
                        requestDto.getLatitude(),
                        requestDto.getLongitude(),
                        requestDto.getTrackingStatus(),
                        requestDto.getLocationAddress(),
                        requestDto.getSpeed(),
                        requestDto.getDistanceRemaining()
                )
        );
    }

    @GetMapping("/{shipmentId}")
    public ResponseEntity<List<TrackingResponseDto>>
    getTrackingHistory(

            @PathVariable Long shipmentId
    ) {

        return ResponseEntity.ok(
                trackingService
                        .getTrackingHistoryByShipment(
                                shipmentId
                        )
        );
    }
}