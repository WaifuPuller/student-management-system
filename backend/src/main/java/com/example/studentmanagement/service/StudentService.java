package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;

import java.util.List;

public interface StudentService {
    StudentResponseDto createStudent(StudentRequestDto studentRequestDto);
    StudentResponseDto getStudentById(Long id);
    List<StudentResponseDto> getAllStudents();
    List<StudentResponseDto> searchStudents(String name);
    StudentResponseDto updateStudent(Long id, StudentRequestDto studentRequestDto);
    void deleteStudent(Long id);
}
