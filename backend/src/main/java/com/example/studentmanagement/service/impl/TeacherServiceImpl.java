package com.example.studentmanagement.service.impl;

import com.example.studentmanagement.dto.TeacherRequestDto;
import com.example.studentmanagement.dto.TeacherResponseDto;
import com.example.studentmanagement.entity.Teacher;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.TeacherRepository;
import com.example.studentmanagement.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    @Override
    public TeacherResponseDto createTeacher(TeacherRequestDto dto) {
        if (teacherRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        Teacher teacher = Teacher.builder()
                .teacherName(dto.getTeacherName())
                .email(dto.getEmail())
                .department(dto.getDepartment())
                .specialization(dto.getSpecialization())
                .phoneNumber(dto.getPhoneNumber())
                .build();

        Teacher savedTeacher = teacherRepository.save(teacher);
        return mapToResponseDto(savedTeacher);
    }

    @Override
    public TeacherResponseDto getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        return mapToResponseDto(teacher);
    }

    @Override
    public List<TeacherResponseDto> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TeacherResponseDto> searchTeachers(String keyword) {
        return teacherRepository.findByTeacherNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(keyword, keyword).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeacherResponseDto updateTeacher(Long id, TeacherRequestDto dto) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));

        if (!teacher.getEmail().equals(dto.getEmail()) && teacherRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        teacher.setTeacherName(dto.getTeacherName());
        teacher.setEmail(dto.getEmail());
        teacher.setDepartment(dto.getDepartment());
        teacher.setSpecialization(dto.getSpecialization());
        teacher.setPhoneNumber(dto.getPhoneNumber());

        Teacher updatedTeacher = teacherRepository.save(teacher);
        return mapToResponseDto(updatedTeacher);
    }

    @Override
    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));

        if (teacher.getCourses() != null && !teacher.getCourses().isEmpty()) {
            throw new IllegalArgumentException("Cannot delete teacher because there are courses assigned to them.");
        }

        teacherRepository.deleteById(id);
    }

    private TeacherResponseDto mapToResponseDto(Teacher teacher) {
        return TeacherResponseDto.builder()
                .id(teacher.getId())
                .teacherName(teacher.getTeacherName())
                .email(teacher.getEmail())
                .department(teacher.getDepartment())
                .specialization(teacher.getSpecialization())
                .phoneNumber(teacher.getPhoneNumber())
                .build();
    }
}
