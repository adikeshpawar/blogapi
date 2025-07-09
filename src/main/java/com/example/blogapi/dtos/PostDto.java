package com.example.blogapi.dtos;

import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Integer postId;
    private String postImage;
    private String postTitle;
    private String postDescription;
    private Set<String> postTags;
    // Optional: include basic user info
    private Integer userId;
    private String userName;
    private List<CommentDto> comments;


}
