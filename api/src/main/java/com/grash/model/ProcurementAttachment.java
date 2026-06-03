package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "procurement_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcurementAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String fileUrl;

    private Long fileSize;

    @ManyToOne
    @JoinColumn(name = "procurement_id")
    private RawMaterialProcurement procurement;
}