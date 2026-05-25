package com.grash.repository;

import com.grash.model.InventoryPart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryPartRepository extends JpaRepository<InventoryPart, Long> {

    Optional<InventoryPart> findByBarcode(String barcode);

    Optional<InventoryPart> findByPartNumber(String partNumber);
}