package com.grash.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class ProductLifecycleMetric {
    private String label;
    private String value;
    private String metricStatus;
}
