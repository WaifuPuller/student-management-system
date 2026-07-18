import React, { useEffect, useState } from 'react';
import { studentService } from '../services/apiService';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const loadStudents = async () => {
        setLoading(true);
        try {
            const res = search 
                ? await studentService.searchStudents(search)
                : await studentService.getAllStudents();
            if (res.success) {
                setStudents(res.data);
            }
        } catch (err) {
            console.error("Error loading students", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, [search]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const res = await studentService.deleteStudent(id);
                if (res.success) {
                    loadStudents();
                }
            } catch (err) {
                alert('Error deleting student');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Student List</h1>
                <Link to="/students/new" className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
                    + Add Student
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search students by name, course, or teacher..."
                        className="pl-10 w-full md:w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading students...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No students found</td>
                                    </tr>
                                ) : (
                                    students.map(student => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.courseName || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.teacherName || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-3">
                                                <Link to={`/students/${student.id}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center" title="View"><FaEye /></Link>
                                                <Link to={`/students/${student.id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center" title="Edit"><FaEdit /></Link>
                                                <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900 inline-flex items-center" title="Delete"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentList;
