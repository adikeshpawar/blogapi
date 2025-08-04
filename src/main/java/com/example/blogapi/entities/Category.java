package com.example.blogapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="categories")

public class Category {
    @Id@GeneratedValue(strategy = GenerationType.AUTO)
    private int categoryId;

    private String categories;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_Id")
    private Post post;


}
