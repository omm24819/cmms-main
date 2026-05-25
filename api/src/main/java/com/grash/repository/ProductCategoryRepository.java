package com.grash.repository;

import com.grash.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductCategoryRepository
        extends JpaRepository<ProductCategory, UUID> {

    boolean existsByName(String name);

    Optional<ProductCategory> findByName(String name);
}
