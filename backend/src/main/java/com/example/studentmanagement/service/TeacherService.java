package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.TeacherRequestDto;
import com.example.studentmanagement.dto.TeacherResponseDto;

import java.util.List;

public interface TeacherService {
    TeacherResponseDto createTeacher(TeacherRequestDto teacherRequestDto);
    TeacherResponseDto getTeacherById(Long id);
    List<TeacherResponseDto> getAllTeachers();
    List<TeacherResponseDto> searchTeachers(String keyword);
    TeacherResponseDto updateTeacher(Long id, TeacherRequestDto teacherRequestDto);
    void deleteTeacher(Long id);
}
