package com.example.blogapi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")  // make sure your DB column is named exactly post_id
    private Integer postId;

    @Column(name = "post_image")
    private String postImage;

    @Column(name = "post_title")
    private String postTitle;

    @Column(name = "post_description")
    private String postDescription;
    @ElementCollection
    @CollectionTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "tag")
    private Set<String> postTags;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy is better to avoid unnecessary fetches
    @JoinColumn(name = "user_id", referencedColumnName = "id") // FK pointing to user(id)
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

}
