package com.example.blogapi.services;

import com.example.blogapi.entities.User;

public interface UserDetailService {

    User findByEmail(String email);
    boolean checkPassword(String rawPassword, String encodedPassword);

}
