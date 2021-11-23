package com.loginsocial.loginSocial.interfaces.rest;

import com.loginsocial.loginSocial.domain.service.GoogleService;
import com.loginsocial.loginSocial.interfaces.dto.GoogleDto;
import com.loginsocial.loginSocial.interfaces.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/user")
public class LoginController {

    private final GoogleService userService;

    public LoginController(GoogleService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/verification")
    public ResponseEntity<UserDto> userVerification(@RequestBody GoogleDto googleDto) {
        UserDto user = userService.verificationGoogleToken(googleDto.tokenId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
