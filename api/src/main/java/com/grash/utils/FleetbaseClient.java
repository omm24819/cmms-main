package com.grash.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class FleetbaseClient {

    private final RestTemplate restTemplate;

    @Value("${fleetbase.api.url}")
    private String fleetbaseApiUrl;

    @Value("${fleetbase.api.key}")
    private String fleetbaseApiKey;

    public String createOrder(
            Map<String, Object> payload
    ) {

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.setBearerAuth(
                fleetbaseApiKey
        );

        HttpEntity<Map<String, Object>>
                requestEntity =
                new HttpEntity<>(
                        payload,
                        headers
                );

        ResponseEntity<String> response =
                restTemplate.exchange(
                        fleetbaseApiUrl + "/orders",
                        HttpMethod.POST,
                        requestEntity,
                        String.class
                );

        return response.getBody();
    }

    public String getOrder(
            String orderId
    ) {

        HttpHeaders headers =
                new HttpHeaders();

        headers.setBearerAuth(
                fleetbaseApiKey
        );

        HttpEntity<Void> requestEntity =
                new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        fleetbaseApiUrl
                                + "/orders/"
                                + orderId,
                        HttpMethod.GET,
                        requestEntity,
                        String.class
                );

        return response.getBody();
    }

    public String deleteOrder(
            String orderId
    ) {

        HttpHeaders headers =
                new HttpHeaders();

        headers.setBearerAuth(
                fleetbaseApiKey
        );

        HttpEntity<Void> requestEntity =
                new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        fleetbaseApiUrl
                                + "/orders/"
                                + orderId,
                        HttpMethod.DELETE,
                        requestEntity,
                        String.class
                );

        return response.getBody();
    }
}