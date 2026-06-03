package com.grash.service;

import com.grash.dto.ShipmentRequestDto;
import com.grash.dto.ShipmentResponseDto;
import com.grash.model.Driver;
import com.grash.model.Shipment;
import com.grash.model.Vehicle;
import com.grash.repository.DriverRepository;
import com.grash.repository.ShipmentRepository;
import com.grash.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;

    private final VehicleRepository vehicleRepository;

    private final DriverRepository driverRepository;

    public ShipmentResponseDto createShipment(
            ShipmentRequestDto requestDto
    ) {

        Vehicle vehicle = vehicleRepository
                .findById(requestDto.getVehicleId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vehicle not found"
                        )
                );

        Driver driver = driverRepository
                .findById(requestDto.getDriverId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Driver not found"
                        )
                );

        Shipment shipment = Shipment.builder()
                .shipmentUid(
                        UUID.randomUUID().toString()
                )
                .trackingNumber(
                        "TRK-" + System.currentTimeMillis()
                )
                .productUid(requestDto.getProductUid())
                .originAddress(
                        requestDto.getOriginAddress()
                )
                .destinationAddress(
                        requestDto.getDestinationAddress()
                )
                .shipmentStatus(
                        requestDto.getShipmentStatus()
                )
                .currentLatitude(
                        requestDto.getCurrentLatitude()
                )
                .currentLongitude(
                        requestDto.getCurrentLongitude()
                )
                .vehicle(vehicle)
                .driver(driver)
                .estimatedDeliveryTime(
                        LocalDateTime.now().plusDays(3)
                )
                .build();

        Shipment savedShipment =
                shipmentRepository.save(shipment);

        return mapToResponse(savedShipment);
    }

    public List<ShipmentResponseDto>
    getAllShipments() {

        return shipmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ShipmentResponseDto
    getShipmentById(Long id) {

        Shipment shipment =
                shipmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Shipment not found"
                                )
                        );

        return mapToResponse(shipment);
    }

    public ShipmentResponseDto
    updateShipmentStatus(
            Long shipmentId,
            String status
    ) {

        Shipment shipment =
                shipmentRepository.findById(shipmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Shipment not found"
                                )
                        );

        shipment.setShipmentStatus(status);

        if (status.equalsIgnoreCase(
                "DELIVERED"
        )) {

            shipment.setDeliveredAt(
                    LocalDateTime.now()
            );
        }

        Shipment updatedShipment =
                shipmentRepository.save(shipment);

        return mapToResponse(updatedShipment);
    }

    public void deleteShipment(Long id) {

        Shipment shipment =
                shipmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Shipment not found"
                                )
                        );

        shipmentRepository.delete(shipment);
    }

    private ShipmentResponseDto
    mapToResponse(Shipment shipment) {

        return ShipmentResponseDto.builder()
                .id(shipment.getId())
                .shipmentUid(
                        shipment.getShipmentUid()
                )
                .productUid(
                        shipment.getProductUid()
                )
                .trackingNumber(
                        shipment.getTrackingNumber()
                )
                .shipmentStatus(
                        shipment.getShipmentStatus()
                )
                .fleetbaseOrderId(
                        shipment.getFleetbaseOrderId()
                )
                .originAddress(
                        shipment.getOriginAddress()
                )
                .destinationAddress(
                        shipment.getDestinationAddress()
                )
                .currentLatitude(
                        shipment.getCurrentLatitude()
                )
                .currentLongitude(
                        shipment.getCurrentLongitude()
                )
                .vehicleNumber(
                        shipment.getVehicle() != null
                                ? shipment.getVehicle()
                                .getVehicleNumber()
                                : null
                )
                .driverName(
                        shipment.getDriver() != null
                                ? shipment.getDriver()
                                .getFullName()
                                : null
                )
                .dispatchedAt(
                        shipment.getDispatchedAt()
                )
                .deliveredAt(
                        shipment.getDeliveredAt()
                )
                .estimatedDeliveryTime(
                        shipment.getEstimatedDeliveryTime()
                )
                .createdAt(
                        shipment.getCreatedAt()
                )
                .build();
    }
}