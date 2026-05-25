package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Product lifecycle timeline event")
public class ProductLifecycleEventDTO {
    private String id;
    private String label;
    private String description;
    private String timestamp;
    private String owner;
}
