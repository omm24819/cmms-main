package com.grash.service;

import com.grash.dto.DriverRequestDto;
import com.grash.dto.DriverResponseDto;
import com.grash.model.Driver;
import com.grash.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverResponseDto createDriver(
            DriverRequestDto requestDto
    ) {

        Driver driver = Driver.builder()
                .driverUid(
                        UUID.randomUUID().toString()
                )
                .fullName(
                        requestDto.getFullName()
                )
                .phone(
                        requestDto.getPhone()
                )
                .email(
                        requestDto.getEmail()
                )
                .licenseNumber(
                        requestDto.getLicenseNumber()
                )
                .licenseType(
                        requestDto.getLicenseType()
                )
                .currentLatitude(
                        requestDto.getCurrentLatitude()
                )
                .currentLongitude(
                        requestDto.getCurrentLongitude()
                )
                .availabilityStatus(
                        requestDto.getAvailabilityStatus()
                )
                .lastActiveAt(
                        LocalDateTime.now()
                )
                .build();

        Driver savedDriver =
                driverRepository.save(driver);

        return mapToResponse(savedDriver);
    }

    public List<DriverResponseDto>
    getAllDrivers() {

        return driverRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public DriverResponseDto
    getDriverById(Long id) {

        Driver driver =
                driverRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        return mapToResponse(driver);
    }

    public DriverResponseDto
    updateDriverStatus(
            Long driverId,
            String status
    ) {

        Driver driver =
                driverRepository.findById(driverId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driver.setAvailabilityStatus(status);

        driver.setLastActiveAt(
                LocalDateTime.now()
        );

        Driver updatedDriver =
                driverRepository.save(driver);

        return mapToResponse(updatedDriver);
    }

    public void deleteDriver(Long id) {

        Driver driver =
                driverRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driverRepository.delete(driver);
    }

    private DriverResponseDto
    mapToResponse(Driver driver) {

        return DriverResponseDto.builder()
                .id(driver.getId())
                .driverUid(
                        driver.getDriverUid()
                )
                .fullName(
                        driver.getFullName()
                )
                .phone(
                        driver.getPhone()
                )
                .email(
                        driver.getEmail()
                )
                .licenseNumber(
                        driver.getLicenseNumber()
                )
                .licenseType(
                        driver.getLicenseType()
                )
                .availabilityStatus(
                        driver.getAvailabilityStatus()
                )
                .currentLatitude(
                        driver.getCurrentLatitude()
                )
                .currentLongitude(
                        driver.getCurrentLongitude()
                )
                .lastActiveAt(
                        driver.getLastActiveAt()
                )
                .createdAt(
                        driver.getCreatedAt()
                )
                .build();
    }
}