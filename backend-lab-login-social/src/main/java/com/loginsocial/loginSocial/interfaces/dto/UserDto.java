package com.loginsocial.loginSocial.interfaces.dto;

import lombok.Data;

@Data
public class UserDto {
    public String userId;
    public String email;
    public Boolean emailVerified;
    public String name;
    public String pictureUrl;
    public String locale;
    public String familyName;
    public String givenName;
}
