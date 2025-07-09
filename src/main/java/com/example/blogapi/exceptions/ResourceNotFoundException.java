package com.example.blogapi.exceptions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {

    private String ResourceName;
    private String FieldName;
    private Integer Id;

    public ResourceNotFoundException(String ResourceName, String FieldName, Integer Id) {
        super(String.format("%s not found with %s : %s", ResourceName, FieldName, Id));
        this.ResourceName = ResourceName;
        this.FieldName = FieldName;
        this.Id = Id;
    }
}
