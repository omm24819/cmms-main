package com.grash.repository;

import com.grash.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    boolean existsByProductUid(String productUid);

    boolean existsByProductSerialNumber(
            String productSerialNumber
    );

    Optional<Product> findByProductUid(
            String productUid
    );

    Optional<Product> findByProductSerialNumber(
            String productSerialNumber
    );


}