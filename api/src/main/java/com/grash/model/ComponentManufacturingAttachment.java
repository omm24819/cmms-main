    package com.grash.model;

    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Table(name = "component_manufacturing_attachments")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class ComponentManufacturingAttachment {

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
        @JoinColumn(name = "component_log_id")
        private ComponentManufacturingLog componentManufacturingLog;
    }