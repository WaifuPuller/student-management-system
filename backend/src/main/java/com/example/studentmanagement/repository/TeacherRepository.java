package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByTeacherNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(String name, String department);
    boolean existsByEmail(String email);
}
