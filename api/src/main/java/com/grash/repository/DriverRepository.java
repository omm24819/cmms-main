package com.grash.repository;

import com.grash.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverRepository
        extends JpaRepository<Driver, Long> {

    Optional<Driver> findByDriverUid(
            String driverUid
    );

    Optional<Driver> findByEmail(
            String email
    );

    Optional<Driver> findByPhone(
            String phone
    );
}