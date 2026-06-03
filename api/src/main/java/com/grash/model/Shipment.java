package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String shipmentUid;

    private String productUid;

    @Column(unique = true)
    private String trackingNumber;

    private String shipmentStatus;

    private String fleetbaseOrderId;

    @Column(columnDefinition = "TEXT")
    private String originAddress;

    @Column(columnDefinition = "TEXT")
    private String destinationAddress;

    private Double currentLatitude;

    private Double currentLongitude;

    private LocalDateTime dispatchedAt;

    private LocalDateTime deliveredAt;

    private LocalDateTime estimatedDeliveryTime;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (shipmentStatus == null) {
            shipmentStatus = "CREATED";
        }
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}