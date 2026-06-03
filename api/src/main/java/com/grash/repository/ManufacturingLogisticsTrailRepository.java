package com.grash.repository;

import com.grash.model.ManufacturingLogisticsTrailLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManufacturingLogisticsTrailRepository
        extends JpaRepository<ManufacturingLogisticsTrailLog, Long> {

    Optional<ManufacturingLogisticsTrailLog>
    findByLogUid(String logUid);

    void deleteByLogUid(String logUid);
}