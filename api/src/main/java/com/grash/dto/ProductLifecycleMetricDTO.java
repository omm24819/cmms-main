package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Product digital twin metric")
public class ProductLifecycleMetricDTO {
    private String label;
    private String value;
    private String status;
}
