package com.grash.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class ProductLifecycleAttachment {
    private String name;
    private String type;
    private String size;
    private String updatedAt;
    private String url;
}
