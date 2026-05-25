package com.grash.controller;

import com.grash.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ProductRepository productRepository;

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary() {

        long totalProducts =
                productRepository.count();

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "totalProducts",
                totalProducts
        );

        return ResponseEntity.ok(response);
    }
}