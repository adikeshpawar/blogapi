package com.example.blogapi.services.impl;

import com.example.blogapi.dtos.CategoryDto;
import com.example.blogapi.entities.Category;
import com.example.blogapi.entities.Post;
import com.example.blogapi.exceptions.ResourceNotFoundException;
import com.example.blogapi.repositories.CategoryRepo;
import com.example.blogapi.repositories.PostRepo;
import com.example.blogapi.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    PostRepo postRepo;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CategoryRepo categoryRepo;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category  = this.modelMapper.map(categoryDto,Category.class);
        Category savedCategory = this.categoryRepo.save(category);
        return  this.modelMapper.map(savedCategory,CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer postId) {
        return null;
    }

    @Override
    public void deleteCategory(Integer categoryId) {

    }
}
