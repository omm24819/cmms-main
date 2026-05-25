package com.grash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grash.dto.ApiResponse;
import com.grash.dto.ProductRequestDto;
import com.grash.dto.ProductResponseDto;
import com.grash.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @PostMapping(
            consumes = {
                    "multipart/form-data"
            }
    )
    public ResponseEntity<ApiResponse<ProductResponseDto>>
    createProduct(

            @RequestPart("product")
            String productJson,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image,

            @RequestPart(
                    value = "attachments",
                    required = false
            )
            MultipartFile[] attachments

    ) throws IOException {

        System.out.println("========= API HIT =========");

        System.out.println(productJson);

        ObjectMapper mapper =
                new ObjectMapper();

        ProductRequestDto dto =
                mapper.readValue(
                        productJson,
                        ProductRequestDto.class
                );

        ProductResponseDto response =
                productService.createProduct(
                        dto,
                        image,
                        attachments
                );

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message(
                                "Product created successfully"
                        )
                        .data(response)
                        .build()
        );
    }

    @PutMapping(
            value = "/{productUid}",
            consumes = {
                    "multipart/form-data"
            }
    )
    public ResponseEntity<ApiResponse<ProductResponseDto>>
    updateProduct(

            @PathVariable
            String productUid,

            @RequestPart("product")
            String productJson,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image,

            @RequestPart(
                    value = "attachments",
                    required = false
            )
            MultipartFile[] attachments

    ) throws IOException {

        ObjectMapper mapper =
                new ObjectMapper();

        ProductRequestDto dto =
                mapper.readValue(
                        productJson,
                        ProductRequestDto.class
                );

        ProductResponseDto response =
                productService.updateProduct(
                        productUid,
                        dto,
                        image,
                        attachments
                );

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message(
                                "Product updated successfully"
                        )
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<
            ApiResponse<List<ProductResponseDto>>
            > getAllProducts() {

        return ResponseEntity.ok(
                ApiResponse
                        .<List<ProductResponseDto>>builder()
                        .success(true)
                        .message("Products fetched")
                        .data(
                                productService.getAllProducts()
                        )
                        .build()
        );
    }

    @GetMapping("/{productUid}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductByUid(
            @PathVariable String productUid
    ) {

        ProductResponseDto response =
                productService.getProductByUid(productUid);

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message("Product fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @DeleteMapping("/{productUid}")
    public ResponseEntity<ApiResponse<String>>
    deleteProduct(
            @PathVariable String productUid
    ) throws IOException {

        productService.deleteProductByUid(
                productUid
        );

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message(
                                "Product deleted successfully"
                        )
                        .data(productUid)
                        .build()
        );
    }
}