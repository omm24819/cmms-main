package com.grash.utils;

import org.springframework.stereotype.Component;

import java.time.Year;
import java.util.UUID;

@Component
public class ProductUidGenerator {

    public String generate() {

        return "PRD-" +
                Year.now().getValue() +
                "-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();
    }
}
