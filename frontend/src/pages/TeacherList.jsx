import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teacherService } from '../services/apiService';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async (keyword = '') => {
        try {
            setLoading(true);
            let res;
            if (keyword) {
                res = await teacherService.searchTeachers(keyword);
            } else {
                res = await teacherService.getAllTeachers();
            }
            if (res.success) {
                setTeachers(res.data);
            }
        } catch (err) {
            setError('Failed to fetch teachers');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTeachers(searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                const res = await teacherService.deleteTeacher(id);
                if (res.success) {
                    fetchTeachers(searchTerm);
                }
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete teacher. Ensure no courses are assigned.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
                <Link to="/teachers/new" className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                    <FaPlus />
                    <span>Add Teacher</span>
                </Link>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex">
                <input
                    type="text"
                    placeholder="Search by name or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition-colors flex items-center">
                    <FaSearch />
                </button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-3 text-sm font-semibold text-gray-600">Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Department</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Email</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Phone</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">No teachers found</td>
                                </tr>
                            ) : (
                                teachers.map((teacher) => (
                                    <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-3 font-medium text-gray-800">{teacher.teacherName}</td>
                                        <td className="p-3 text-gray-600">{teacher.department}</td>
                                        <td className="p-3 text-gray-600">{teacher.email}</td>
                                        <td className="p-3 text-gray-600">{teacher.phoneNumber}</td>
                                        <td className="p-3 text-center space-x-3">
                                            <Link to={`/teachers/${teacher.id}/edit`} className="text-blue-500 hover:text-blue-700 inline-block" title="Edit">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(teacher.id)} className="text-red-500 hover:text-red-700 inline-block" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TeacherList;
