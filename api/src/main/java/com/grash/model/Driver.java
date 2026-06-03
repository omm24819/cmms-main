package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String driverUid;

    private String fullName;

    @Column(unique = true)
    private String phone;

    @Column(unique = true)
    private String email;

    private String licenseNumber;

    private String licenseType;

    private String availabilityStatus;

    private Double currentLatitude;

    private Double currentLongitude;

    private LocalDateTime lastActiveAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (availabilityStatus == null) {
            availabilityStatus = "AVAILABLE";
        }
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}