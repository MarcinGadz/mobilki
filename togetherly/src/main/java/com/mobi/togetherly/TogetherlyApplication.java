package com.mobi.togetherly;

import com.mobi.togetherly.config.TokenProvider;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.logging.Logger;

@SpringBootApplication
public class TogetherlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TogetherlyApplication.class, args);
	}
	@Bean
	public TokenProvider tokenProvider() {
		return new TokenProvider();
	}

}
