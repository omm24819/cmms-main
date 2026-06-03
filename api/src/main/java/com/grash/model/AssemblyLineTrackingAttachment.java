package com.grash.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assembly_line_tracking_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssemblyLineTrackingAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String originalFileName;

    private String filePath;

    private String fileType;

    private Long fileSize;

    private String attachmentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assembly_log_id")
    private AssemblyLineTrackingLog assemblyLineTrackingLog;
}