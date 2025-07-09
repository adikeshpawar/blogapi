package com.example.blogapi.services.impl;

import com.example.blogapi.dtos.UserDto;
import com.example.blogapi.entities.User;
import com.example.blogapi.exceptions.ResourceNotFoundException;
import com.example.blogapi.repositories.UserRepo;
import com.example.blogapi.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {


    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto CreateUser(UserDto userDto) {
        User user = modelMapper.map(userDto,User.class);
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);

        User savedUser = this.userRepo.save(user);
        return  this.modelMapper.map(savedUser,UserDto.class);
    }

    @Override
    public UserDto UpdateUser(UserDto userDto, Integer uid) {
        // 1. Fetch existing user or throw exception if not found
        User user = this.userRepo.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", uid));

        // 2. Update fields (you can selectively update as needed)
        user.setUserName(userDto.getUserName());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());
        // user.setRole(userDto.getRole()); // Optional if role is also modifiable

        // 3. Save updated user
        User updatedUser = this.userRepo.save(user);

        // 4. Return updated user as DTO
        return this.modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void DeleteUser(Integer uid) {
        User user = this.userRepo.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", uid));
        this.userRepo.delete(user);
    }

    @Override
    public List<UserDto> GetAllUsers() {
        List<User> users = this.userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .toList();  // or collect(Collectors.toList()) if you're using Java < 16

        return userDtos;
    }


    @Override
    public UserDto GetUserById(Integer uid) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", uid));
        return modelMapper.map(user, UserDto.class);
    }
    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElse(null); // Or throw custom exception if you prefer
    }
    @Override
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

}
