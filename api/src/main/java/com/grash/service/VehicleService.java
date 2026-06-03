package com.grash.service;

import com.grash.dto.VehicleRequestDto;
import com.grash.dto.VehicleResponseDto;
import com.grash.model.Vehicle;
import com.grash.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleResponseDto createVehicle(
            VehicleRequestDto requestDto
    ) {

        Vehicle vehicle = Vehicle.builder()
                .vehicleUid(
                        UUID.randomUUID().toString()
                )
                .vehicleNumber(
                        requestDto.getVehicleNumber()
                )
                .vehicleType(
                        requestDto.getVehicleType()
                )
                .vehicleBrand(
                        requestDto.getVehicleBrand()
                )
                .vehicleModel(
                        requestDto.getVehicleModel()
                )
                .fuelLevel(
                        requestDto.getFuelLevel()
                )
                .carryingCapacity(
                        requestDto.getCarryingCapacity()
                )
                .currentLatitude(
                        requestDto.getCurrentLatitude()
                )
                .currentLongitude(
                        requestDto.getCurrentLongitude()
                )
                .vehicleStatus(
                        requestDto.getVehicleStatus()
                )
                .lastActiveAt(
                        LocalDateTime.now()
                )
                .build();

        Vehicle savedVehicle =
                vehicleRepository.save(vehicle);

        return mapToResponse(savedVehicle);
    }

    public List<VehicleResponseDto>
    getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VehicleResponseDto
    getVehicleById(Long id) {

        Vehicle vehicle =
                vehicleRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vehicle not found"
                                )
                        );

        return mapToResponse(vehicle);
    }

    public VehicleResponseDto
    updateVehicleStatus(
            Long vehicleId,
            String status
    ) {

        Vehicle vehicle =
                vehicleRepository.findById(vehicleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vehicle not found"
                                )
                        );

        vehicle.setVehicleStatus(status);

        vehicle.setLastActiveAt(
                LocalDateTime.now()
        );

        Vehicle updatedVehicle =
                vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    public void deleteVehicle(Long id) {

        Vehicle vehicle =
                vehicleRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vehicle not found"
                                )
                        );

        vehicleRepository.delete(vehicle);
    }

    private VehicleResponseDto
    mapToResponse(Vehicle vehicle) {

        return VehicleResponseDto.builder()
                .id(vehicle.getId())
                .vehicleUid(
                        vehicle.getVehicleUid()
                )
                .vehicleNumber(
                        vehicle.getVehicleNumber()
                )
                .vehicleType(
                        vehicle.getVehicleType()
                )
                .vehicleBrand(
                        vehicle.getVehicleBrand()
                )
                .vehicleModel(
                        vehicle.getVehicleModel()
                )
                .vehicleStatus(
                        vehicle.getVehicleStatus()
                )
                .currentLatitude(
                        vehicle.getCurrentLatitude()
                )
                .currentLongitude(
                        vehicle.getCurrentLongitude()
                )
                .fuelLevel(
                        vehicle.getFuelLevel()
                )
                .carryingCapacity(
                        vehicle.getCarryingCapacity()
                )
                .lastActiveAt(
                        vehicle.getLastActiveAt()
                )
                .createdAt(
                        vehicle.getCreatedAt()
                )
                .build();
    }
}