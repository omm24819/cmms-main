package com.grash.repository;

import com.grash.model.RawMaterialProcurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RawMaterialProcurementRepository
        extends JpaRepository<
        RawMaterialProcurement,
        Long
        > {

    Optional<RawMaterialProcurement>
    findByLogUid(String logUid);
}