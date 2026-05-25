package com.grash.exception;

import com.grash.dto.SuccessResponse;
import com.grash.mapper.ApiResponse;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.bind.ValidationException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandlerController {

    @Bean
    public ErrorAttributes errorAttributes() {
        // Hide exception field in the return object
        return new DefaultErrorAttributes() {
            @Override
            public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
                return super.getErrorAttributes(webRequest,
                        ErrorAttributeOptions.defaults().excluding(ErrorAttributeOptions.Include.EXCEPTION));
            }
        };
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<SuccessResponse> handleCustomException(HttpServletResponse res, CustomException ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), ex.getHttpStatus());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<SuccessResponse> handleAccessDeniedException(HttpServletResponse res) {
        return new ResponseEntity<>(new SuccessResponse(false, "Access is denied"), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<SuccessResponse> handleHttpRequestMethodNotSupportedException(HttpServletResponse res,
                                                                                        Exception ex) {
        return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ValidationException.class)
    ResponseEntity<SuccessResponse> handleValidationException(ValidationException ex) {
        return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<SuccessResponse> handleException(HttpServletResponse res, Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(
            ResourceNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicate(
            DuplicateResourceException ex) {

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> validationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {

            errors.put(error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                        .success(false)
                        .message("Validation Failed")
                        .errors(errors)
                        .timestamp(LocalDateTime.now())
                        .build());
    }

}

