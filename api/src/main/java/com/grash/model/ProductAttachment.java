package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}