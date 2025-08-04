package com.example.blogapi.controller;

import com.example.blogapi.dtos.PostDto;
import com.example.blogapi.services.FileService;
import com.example.blogapi.services.PostService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Value("${project.image}")
    private String path;
//	create

    @Autowired
    private PostService postService;
    @Autowired
    private FileService fileService;
    // Create Post
    @PostMapping("/user/{userId}")
    public ResponseEntity<PostDto> createPost(
            @RequestBody PostDto postDto,
            @PathVariable Integer userId
    ) {
        PostDto createdPost = postService.createPost(postDto, userId);

        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    // Update Post
    @PutMapping("/{postId}/user/{userId}")
    public ResponseEntity<PostDto> updatePost(
            @RequestBody PostDto postDto,
            @PathVariable Integer postId,
            @PathVariable Integer userId
    ) {

        PostDto updatedPost = postService.updatePost(postDto, postId, userId);
        return ResponseEntity.ok(updatedPost);
    }

    // Delete Post
    @DeleteMapping("/{postId}/user/{userId}")
    public ResponseEntity<String> deletePost(
            @PathVariable Integer postId,
            @PathVariable Integer userId
    ) {
        postService.deletePost(postId, userId);
        return ResponseEntity.ok("Post deleted successfully.");
    }

    // Get All Posts
    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Get Post By ID
    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    // Search Posts By Tag
    @GetMapping("/search")
    public ResponseEntity<List<PostDto>> searchPostsByTag(@RequestParam String tag) {
        return ResponseEntity.ok(postService.searchPostsByTag(tag));
    }

    @PostMapping("/post/image/upload/{postId}/user/{userId}")
    public ResponseEntity<PostDto> uploadPostImage(
            @RequestParam("image") MultipartFile image,
            @PathVariable Integer postId,
            @PathVariable Integer userId) throws IOException {

        PostDto postDto = this.postService.getPostById(postId);

        String fileName = this.fileService.uploadImage(path, image);
        postDto.setPostImage(fileName);
        System.out.println("Received image: " + image.getOriginalFilename());
        PostDto updatePost = this.postService.updatePost(postDto, postId, userId);
        return new ResponseEntity<>(updatePost, HttpStatus.OK);
    }


    //method to serve files
    @GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {

        InputStream resource = this.fileService.getResource(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream())   ;

    }
    // Get All Posts by a Specific User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getPostsByUser(@PathVariable Integer userId) {
        List<PostDto> posts = postService.getAllPostByUser(userId);
        return ResponseEntity.ok(posts);
    }


}
