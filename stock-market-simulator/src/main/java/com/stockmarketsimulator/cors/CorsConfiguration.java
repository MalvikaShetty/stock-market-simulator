package com.stockmarketsimulator.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Configure the URL patterns you want to allow
                .allowedOrigins("http://localhost:3000") // Replace with your frontend's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");

        registry.addMapping("/auth/**")
                .allowedOrigins("http://localhost:3000") // Specify allowed origins
                .allowedMethods("GET", "POST") // Specify allowed methods
                .allowedHeaders("Authorization", "Content-Type") // Specify allowed headers
                .allowCredentials(true); // Allow credentials
    }
}
