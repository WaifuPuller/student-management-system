import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
    searchStudents: async (name) => {
        const response = await apiClient.get(`/students/search?name=${name}`);
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
