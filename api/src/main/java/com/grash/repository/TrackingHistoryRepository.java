package com.grash.repository;

import com.grash.model.TrackingHistory;
import com.grash.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingHistoryRepository
        extends JpaRepository<TrackingHistory, Long> {

    List<TrackingHistory> findByShipment(
            Shipment shipment
    );

    List<TrackingHistory> findByShipmentId(
            Long shipmentId
    );
}