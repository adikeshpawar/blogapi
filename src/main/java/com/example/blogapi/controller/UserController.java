package com.example.blogapi.controller;

import com.example.blogapi.dtos.Signup;
import com.example.blogapi.dtos.UserDto;
import com.example.blogapi.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    // POST /api/users  --> Create user
    @PostMapping("")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto createdUser = userService.CreateUser(userDto);
        return ResponseEntity.ok(createdUser);
    }

    // GET /api/users/{userId}  --> Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Integer userId) {
        UserDto getUser = userService.GetUserById(userId);
        return ResponseEntity.ok(getUser);
    }

    // PUT /api/users/{userId}  --> Update user by ID
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(
            @RequestBody UserDto userDto,
            @PathVariable("userId") Integer uid) {

        UserDto updatedUser = userService.UpdateUser(userDto, uid);
        return ResponseEntity.ok(updatedUser);
    }

    // DELETE /api/users/{userId}  --> Delete user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Integer uid){
        userService.DeleteUser(uid);
        return ResponseEntity.ok("User has been deleted");
    }

    // GET /api/users  --> Get all users
    @GetMapping("")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.GetAllUsers();
        return ResponseEntity.ok(users);
    }
    //signup user

}
