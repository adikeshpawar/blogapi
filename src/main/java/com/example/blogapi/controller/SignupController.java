package com.example.blogapi.controller;

import com.example.blogapi.dtos.LoginDto;
import com.example.blogapi.dtos.Signup;
import com.example.blogapi.dtos.UserDto;
import com.example.blogapi.entities.User;
import com.example.blogapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")  // clearer base path
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> registerUser(@RequestBody Signup signup) {
        UserDto userDto = new UserDto();
        userDto.setUserName(signup.getUserName());
        userDto.setEmail(signup.getEmail());
        userDto.setPassword(signup.getPassword());
        userDto.setAbout(signup.getAbout());
        UserDto createdUser = userService.CreateUser(userDto);
        return ResponseEntity.ok(createdUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        User user = this.userService.findByEmail(loginDto.getEmail());

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        boolean passwordChecker = this.userService.checkPassword(loginDto.getPassword(), user.getPassword());

        if (!passwordChecker) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of("message", "Login successful"));
    }

}