package com.ossp.cocktagorize.controller;


import org.springframework.http.HttpStatus;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.ResponseStatus;
        import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthCheckController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String healthCheck() {
        return "OK";
    }
}
