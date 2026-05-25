package com.grash.configuration;

import com.grash.model.ProductCategory;
import com.grash.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductCategoryRepository categoryRepository;

    @Override
    public void run(String... args) {

        createCategoryIfNotExists(
                "IoT Device",
                "Industrial IoT Devices"
        );

        createCategoryIfNotExists(
                "Auto Feeder",
                "Aquaculture Auto Feeders"
        );

        createCategoryIfNotExists(
                "Waste Water Equipment",
                "Waste Water Management Systems"
        );
    }

    private void createCategoryIfNotExists(
            String name,
            String description) {

        ProductCategory category =
                categoryRepository.findByName(name)
                        .orElseGet(() -> {

                            ProductCategory newCategory =
                                    new ProductCategory();

                            newCategory.setName(name);
                            newCategory.setDescription(description);

                            return categoryRepository.save(newCategory);
                        });

        System.out.println("=================================");
        System.out.println("CATEGORY NAME : " + category.getName());
        System.out.println("=================================");
    }
}