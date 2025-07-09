package com.example.blogapi.services;

import com.example.blogapi.dtos.PostDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    PostDto createPost(PostDto postDto, Integer userId);


    PostDto updatePost(PostDto postDto, Integer postId, Integer userId);
    List<PostDto> getAllPosts();
    void deletePost(Integer postId,Integer userId);
    PostDto getPostById(Integer postId);
    List<PostDto> searchPostsByTag(String tag);

}
