package com.example.studentmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequestDto {

    @NotBlank(message = "Course Name is required")
    private String courseName;

    @NotBlank(message = "Course Code is required")
    private String courseCode;

    @NotNull(message = "Credits are required")
    @Min(value = 1, message = "Credits must be greater than zero")
    private Integer credits;

    @NotNull(message = "Teacher ID is required")
    private Long teacherId;
}
