package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Product lifecycle document metadata")
public class ProductLifecycleDocumentDTO {
    private String id;
    private String name;
    private String category;
    private String owner;
    private String updatedAt;
}
