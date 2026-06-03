package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManufacturingLogisticsTrailAttachmentDto {

    private Long id;

    private String fileName;

    private String originalFileName;

    private String filePath;

    private String fileType;

    private Long fileSize;

    private String attachmentType;
}