package com.grash.controller;

import com.grash.dto.DriverRequestDto;
import com.grash.dto.DriverResponseDto;
import com.grash.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @PostMapping
    public ResponseEntity<DriverResponseDto>
    createDriver(
            @RequestBody
            DriverRequestDto requestDto
    ) {

        return ResponseEntity.ok(
                driverService.createDriver(
                        requestDto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<DriverResponseDto>>
    getAllDrivers() {

        return ResponseEntity.ok(
                driverService.getAllDrivers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriverResponseDto>
    getDriverById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                driverService.getDriverById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<DriverResponseDto>
    updateDriverStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                driverService.updateDriverStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteDriver(
            @PathVariable Long id
    ) {

        driverService.deleteDriver(id);

        return ResponseEntity.ok(
                "Driver deleted successfully"
        );
    }
}