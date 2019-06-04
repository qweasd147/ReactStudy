package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ApiController {

    @GetMapping("/data1")
    @ResponseStatus(value = HttpStatus.OK)
    public String requestData1(){
        return "load index data from server";
    }

    @GetMapping("/data2")
    @ResponseStatus(value = HttpStatus.OK)
    public String requestData2(){
        return "load page data from server";
    }
}
