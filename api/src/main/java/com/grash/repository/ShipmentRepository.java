package com.grash.repository;

import com.grash.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipmentRepository
        extends JpaRepository<Shipment, Long> {

    Optional<Shipment> findByShipmentUid(
            String shipmentUid
    );

    Optional<Shipment> findByTrackingNumber(
            String trackingNumber
    );
}