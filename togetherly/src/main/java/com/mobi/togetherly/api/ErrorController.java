package com.mobi.togetherly.api;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController {
    @ExceptionHandler(Exception.class)
    public String handle() {
        return "Handling exception";
    }
}
