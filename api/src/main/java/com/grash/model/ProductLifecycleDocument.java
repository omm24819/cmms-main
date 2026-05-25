package com.grash.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class ProductLifecycleDocument {
    private String documentId;
    private String name;
    private String category;
    private String owner;
    private String updatedAt;
}
