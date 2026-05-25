package com.grash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Product lifecycle attachment metadata")
public class ProductLifecycleAttachmentDTO {
    private String name;
    private String type;
    private String size;
    private String updatedAt;
    private String url;
}
