package com.example.blogapi.controller;

import com.example.blogapi.dtos.LoginDto;
import com.example.blogapi.dtos.Signup;
import com.example.blogapi.dtos.UserDto;
import com.example.blogapi.Security.JwtUtil;
import com.example.blogapi.entities.User;
import com.example.blogapi.services.UserService;
import com.example.blogapi.services.impl.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class SignupController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Signup Endpoint
    @PostMapping("/signup")
    public ResponseEntity<UserDto> registerUser(@RequestBody Signup signup) {
        UserDto userDto = new UserDto();
        userDto.setUserName(signup.getUserName());
        userDto.setEmail(signup.getEmail());
        userDto.setPassword(signup.getPassword()); // Password will be hashed in service
        userDto.setAbout(signup.getAbout());

        UserDto createdUser = userService.CreateUser(userDto);
        return ResponseEntity.ok(createdUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        // Fetch full User entity to get the ID
        User user = userService.findByEmail(loginDto.getEmail());
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token,
                "userId", user.getId()
        ));
    }

}
