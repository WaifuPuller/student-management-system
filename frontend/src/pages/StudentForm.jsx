import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/apiService';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        year: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const fetchStudent = async () => {
                try {
                    const res = await studentService.getStudentById(id);
                    if (res.success) {
                        setFormData({
                            name: res.data.name,
                            email: res.data.email,
                            phone: res.data.phone,
                            course: res.data.course,
                            year: res.data.year
                        });
                    }
                } catch (err) {
                    setApiError('Failed to load student data');
                }
            };
            fetchStudent();
        }
    }, [id, isEditMode]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.phone) {
            tempErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.course) tempErrors.course = 'Course is required';
        if (!formData.year) tempErrors.year = 'Year is required';
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phone') {
            if (value !== '' && !/^\d+$/.test(value)) return;
            if (value.length > 10) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setApiError('');
        try {
            let res;
            if (isEditMode) {
                res = await studentService.updateStudent(id, formData);
            } else {
                res = await studentService.createStudent(formData);
            }

            if (res.success) {
                navigate('/students');
            } else {
                setApiError(res.message || 'An error occurred');
            }
        } catch (err) {
            setApiError(err.response?.data?.message || 'Server error occurred');
            if (err.response?.data?.data) {
                setErrors(err.response.data.data); // Validation errors from backend
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? 'Edit Student' : 'Add New Student'}
            </h1>

            {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g. Computer Science"
                        />
                        {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                        {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                    <button
                        type="button"
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-4 py-2 border border-transparent rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Saving...' : 'Save Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
