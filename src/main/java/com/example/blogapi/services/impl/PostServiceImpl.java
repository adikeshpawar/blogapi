package com.example.blogapi.services.impl;

import com.example.blogapi.dtos.CategoryDto;
import com.example.blogapi.dtos.CommentDto;
import com.example.blogapi.dtos.PostDto;
import com.example.blogapi.entities.Category;
import com.example.blogapi.entities.Comment;
import com.example.blogapi.entities.Post;
import com.example.blogapi.entities.User;
import com.example.blogapi.exceptions.ResourceNotFoundException;
import com.example.blogapi.repositories.CommentRepo;
import com.example.blogapi.repositories.PostRepo;
import com.example.blogapi.repositories.UserRepo;
import com.example.blogapi.services.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostRepo postRepo;

    @Override
    public PostDto createPost(PostDto postDto, Integer userId) {
        // Fetch User
        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        // Map DTO to Entity
        Post post = this.modelMapper.map(postDto, Post.class);
        post.setUser(user);

        // Save Post
        Post savedPost = postRepo.save(post);

        // Map back to DTO
        PostDto savedPostDto = modelMapper.map(savedPost, PostDto.class);

        // Set userId and userName manually in DTO (optional but helpful for clarity)
        savedPostDto.setUserId(user.getId());
        savedPostDto.setUserName(user.getUserName());

        // Map Comments
        List<CommentDto> commentDtos = savedPost.getComments() == null ? List.of() :
                savedPost.getComments().stream()
                        .map(comment -> modelMapper.map(comment, CommentDto.class))
                        .collect(Collectors.toList());

        savedPostDto.setComments(commentDtos);
        List<CategoryDto> categoryDtos = savedPost.getCategories() == null ? List.of():
            savedPost.getCategories().stream().map(category -> modelMapper.map(category,CategoryDto.class)).collect(Collectors.toList())  ;
            savedPostDto.setCategoryDto(categoryDtos);
        return savedPostDto;
    }


    @Override
    public PostDto updatePost(PostDto postDto, Integer postId ,Integer userId) {

        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("The post doesn't belong to you to update.");
        }
        post.setPostTitle(postDto.getPostTitle());
        post.setPostImage(postDto.getPostImage());
        post.setPostDescription(postDto.getPostDescription());

        Post updatedPost = postRepo.save(post);
        return modelMapper.map(updatedPost, PostDto.class);
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepo.findAll();
        return posts.stream()
                .map(post -> modelMapper.map(post, PostDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deletePost(Integer postId,Integer userId) {
        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        if(!post.getUser().getId().equals(userId)){
            throw   new RuntimeException("you are not authorized to delete someone else post");
        }
        System.out.println("Deleting post: " + post.getPostTitle());
        this.postRepo.delete(post);
    }

    @Override
    public PostDto getPostById(Integer postId) {
        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

        PostDto postDto = modelMapper.map(post, PostDto.class);

        // Map comments manually
        List<Comment> comments = commentRepo.findByPost(post);
        List<CommentDto> commentDtos = comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        postDto.setComments(commentDtos);

        return postDto;
    }

    @Override
    public List<PostDto> searchPostsByTag(String tag) {
        List<Post> posts = this.postRepo.findByPostTagsContaining(tag); // get list of posts
        return posts.stream()
                .map(post -> modelMapper.map(post, PostDto.class)) // map each to DTO
                .collect(Collectors.toList()); // collect as list
    }

    @Override
    public List<PostDto> getAllPostByUser(Integer userId) {
        List<Post> posts = this.postRepo.findByUser_Id(userId);

        if (posts.isEmpty()) {
            throw new ResourceNotFoundException("user", "userId", userId);
        }

        return posts.stream()
                .map(post -> modelMapper.map(post, PostDto.class))
                .collect(Collectors.toList());
    }



}
