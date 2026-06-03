package com.grash.repository;

import com.grash.model.AssemblyLineTrackingLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssemblyLineTrackingRepository
        extends JpaRepository<AssemblyLineTrackingLog, Long> {

    Optional<AssemblyLineTrackingLog>
    findByLogUid(String logUid);

    void deleteByLogUid(String logUid);
}