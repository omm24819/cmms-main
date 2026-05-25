package com.grash.mapper;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ApiResponse<T> {

    private Boolean success;

    private String message;

    private T data;

    private Object errors;

    private LocalDateTime timestamp;
}
