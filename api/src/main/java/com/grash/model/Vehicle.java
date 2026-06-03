package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String vehicleUid;

    @Column(unique = true)
    private String vehicleNumber;

    private String vehicleType;

    private String vehicleBrand;

    private String vehicleModel;

    private String vehicleStatus;

    private Double currentLatitude;

    private Double currentLongitude;

    private Double fuelLevel;

    private Integer carryingCapacity;

    private LocalDateTime lastActiveAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (vehicleStatus == null) {
            vehicleStatus = "AVAILABLE";
        }
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}