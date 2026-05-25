package com.grash.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttachmentResponseDto {

    private Long id;

    private String fileName;

    private String fileUrl;
}