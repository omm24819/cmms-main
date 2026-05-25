package com.grash.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.grash.exception.CustomException;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

public enum ProductLifecycleStatus {
    DRAFT("Draft"),
    MANUFACTURING("Manufacturing"),
    IN_SERVICE("In Service"),
    MAINTENANCE("Maintenance"),
    RETIRED("Retired");

    private final String label;

    ProductLifecycleStatus(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    public static ProductLifecycleStatus fromLabel(String value) {
        if (value == null || value.trim().isEmpty()) return null;
        return Arrays.stream(values())
                .filter(status -> status.label.equalsIgnoreCase(value.trim()) || status.name().equalsIgnoreCase(value.trim()))
                .findFirst()
                .orElseThrow(() -> new CustomException("Invalid product status: " + value, HttpStatus.BAD_REQUEST));
    }
}
