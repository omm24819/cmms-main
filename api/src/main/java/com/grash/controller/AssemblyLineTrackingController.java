package com.grash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grash.dto.AssemblyLineTrackingRequestDto;
import com.grash.dto.AssemblyLineTrackingResponseDto;
import com.grash.service.AssemblyLineTrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/assembly-line-tracking")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AssemblyLineTrackingController {

    private final AssemblyLineTrackingService service;

    private final ObjectMapper objectMapper;

    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public AssemblyLineTrackingResponseDto create(

            @RequestParam("assemblyData")
            String assemblyData,

            @RequestParam(
                    value = "documents",
                    required = false
            )
            List<MultipartFile> documents,

            @RequestParam(
                    value = "productImages",
                    required = false
            )
            List<MultipartFile> productImages

    ) throws Exception {

        AssemblyLineTrackingRequestDto dto =
                objectMapper.readValue(
                        assemblyData,
                        AssemblyLineTrackingRequestDto.class
                );

        return service.create(
                dto,
                documents,
                productImages
        );
    }

    @GetMapping
    public List<AssemblyLineTrackingResponseDto> getAll() {

        return service.getAll();
    }

    @GetMapping("/{logUid}")
    public AssemblyLineTrackingResponseDto getByLogUid(
            @PathVariable String logUid
    ) {

        return service.getByLogUid(logUid);
    }

    @DeleteMapping("/{logUid}")
    public void deleteByLogUid(
            @PathVariable String logUid
    ) {

        service.deleteByLogUid(logUid);
    }
}