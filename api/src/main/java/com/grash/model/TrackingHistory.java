package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tracking_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    private Double latitude;

    private Double longitude;

    private String trackingStatus;

    @Column(columnDefinition = "TEXT")
    private String locationAddress;

    private Double speed;

    private Double distanceRemaining;

    private LocalDateTime trackedAt;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        if (trackedAt == null) {
            trackedAt = LocalDateTime.now();
        }
    }
}