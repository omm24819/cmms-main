package com.grash.repository;

import com.grash.model.ComponentManufacturingLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComponentManufacturingRepository
        extends JpaRepository<ComponentManufacturingLog, Long> {

    Optional<ComponentManufacturingLog>
    findByLogUid(String logUid);

    void deleteByLogUid(String logUid);
}