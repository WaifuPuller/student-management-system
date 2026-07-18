import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const studentService = {
    getAllStudents: async () => {
        const response = await apiClient.get('/students');
        return response.data;
    },
    getStudentById: async (id) => {
        const response = await apiClient.get(`/students/${id}`);
        return response.data;
    },
    searchStudents: async (keyword) => {
        const response = await apiClient.get(`/students/search?keyword=${keyword}`);
        return response.data;
    },
    createStudent: async (student) => {
        const response = await apiClient.post('/students', student);
        return response.data;
    },
    updateStudent: async (id, student) => {
        const response = await apiClient.put(`/students/${id}`, student);
        return response.data;
    },
    deleteStudent: async (id) => {
        const response = await apiClient.delete(`/students/${id}`);
        return response.data;
    }
};

export const teacherService = {
    getAllTeachers: async () => {
        const response = await apiClient.get('/teachers');
        return response.data;
    },
    getTeacherById: async (id) => {
        const response = await apiClient.get(`/teachers/${id}`);
        return response.data;
    },
    searchTeachers: async (keyword) => {
        const response = await apiClient.get(`/teachers/search?keyword=${keyword}`);
        return response.data;
    },
    createTeacher: async (teacher) => {
        const response = await apiClient.post('/teachers', teacher);
        return response.data;
    },
    updateTeacher: async (id, teacher) => {
        const response = await apiClient.put(`/teachers/${id}`, teacher);
        return response.data;
    },
    deleteTeacher: async (id) => {
        const response = await apiClient.delete(`/teachers/${id}`);
        return response.data;
    }
};

export const courseService = {
    getAllCourses: async () => {
        const response = await apiClient.get('/courses');
        return response.data;
    },
    getCourseById: async (id) => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data;
    },
    searchCourses: async (keyword) => {
        const response = await apiClient.get(`/courses/search?keyword=${keyword}`);
        return response.data;
    },
    getCoursesByTeacherId: async (teacherId) => {
        const response = await apiClient.get(`/courses/teacher/${teacherId}`);
        return response.data;
    },
    createCourse: async (course) => {
        const response = await apiClient.post('/courses', course);
        return response.data;
    },
    updateCourse: async (id, course) => {
        const response = await apiClient.put(`/courses/${id}`, course);
        return response.data;
    },
    deleteCourse: async (id) => {
        const response = await apiClient.delete(`/courses/${id}`);
        return response.data;
    }
};
