package com.example.blogapi.services;

import com.example.blogapi.dtos.UserDto;
import com.example.blogapi.entities.User;

import java.util.List;

public interface UserService {
    UserDto CreateUser(UserDto userDto);
    UserDto UpdateUser(UserDto userDto,Integer uid);
    void  DeleteUser(Integer uid);
    List<UserDto> GetAllUsers();
    UserDto GetUserById(Integer uid);

    User findByEmail(String email);
    boolean checkPassword(String rawPassword, String encodedPassword);

}
