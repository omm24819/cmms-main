package com.grash.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.grash.exception.CustomException;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

public enum ProductLifecycleStage {
    DESIGN("Design"),
    PROTOTYPE("Prototype"),
    MANUFACTURING("Manufacturing"),
    IN_SERVICE("In Service"),
    MAINTENANCE("Maintenance"),
    RETIRED("Retired");

    private final String label;

    ProductLifecycleStage(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    public static ProductLifecycleStage fromLabel(String value) {
        if (value == null || value.trim().isEmpty()) return null;
        return Arrays.stream(values())
                .filter(stage -> stage.label.equalsIgnoreCase(value.trim()) || stage.name().equalsIgnoreCase(value.trim()))
                .findFirst()
                .orElseThrow(() -> new CustomException("Invalid lifecycle stage: " + value, HttpStatus.BAD_REQUEST));
    }
}
