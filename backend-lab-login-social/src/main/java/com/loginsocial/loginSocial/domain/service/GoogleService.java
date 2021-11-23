package com.loginsocial.loginSocial.domain.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.loginsocial.loginSocial.interfaces.dto.UserDto;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleService {

    @SneakyThrows
    public UserDto verificationGoogleToken(String token) {

        UserDto user = new UserDto();

        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                        .setAudience(Collections.singleton("187999478003-aka68hoqlh9ceprcaj767nltltsu6mvc.apps.googleusercontent.com"))
                        .build();

        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            user.setUserId(payload.getSubject());
            user.setEmail(payload.getEmail());
            user.setEmailVerified(payload.getEmailVerified());
            user.setName((String) payload.get("name"));
            user.setPictureUrl((String) payload.get("picture"));
            user.setLocale((String) payload.get("locale"));
            user.setFamilyName((String) payload.get("family_name"));
            user.setGivenName((String) payload.get("given_name"));
        }
        return user;
    }
}
