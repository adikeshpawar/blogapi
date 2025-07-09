package com.example.blogapi.dtos;

import com.example.blogapi.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
        private Integer commentId;       // if needed for updates or responses
        private String content;
        private Integer postId;
        private Integer userId;
        private String userName;         // optional: useful for display
    }


