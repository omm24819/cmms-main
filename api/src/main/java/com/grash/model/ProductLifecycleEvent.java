package com.grash.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class ProductLifecycleEvent {
    private String eventId;
    private String label;

    @Column(length = 10000)
    private String description;

    private String timestamp;
    private String owner;
}
