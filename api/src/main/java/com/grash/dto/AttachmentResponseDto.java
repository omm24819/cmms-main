package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttachmentResponseDto {

    private Long id;

    private String fileName;

    private String fileType;

    private String fileUrl;

    private Long fileSize;
}