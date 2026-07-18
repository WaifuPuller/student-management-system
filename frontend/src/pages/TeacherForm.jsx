import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teacherService } from '../services/apiService';

const TeacherForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        teacherName: '',
        email: '',
        department: '',
        specialization: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const fetchTeacher = async () => {
                try {
                    const res = await teacherService.getTeacherById(id);
                    if (res.success) {
                        setFormData({
                            teacherName: res.data.teacherName,
                            email: res.data.email,
                            department: res.data.department,
                            specialization: res.data.specialization || '',
                            phoneNumber: res.data.phoneNumber
                        });
                    }
                } catch (err) {
                    setApiError('Failed to load teacher data');
                }
            };
            fetchTeacher();
        }
    }, [id, isEditMode]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.teacherName) tempErrors.teacherName = 'Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.department) tempErrors.department = 'Department is required';
        if (!formData.phoneNumber) {
            tempErrors.phoneNumber = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = 'Phone number must be exactly 10 digits';
        }
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phoneNumber') {
            if (value !== '' && !/^\d+$/.test(value)) return;
            if (value.length > 10) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
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
                res = await teacherService.updateTeacher(id, formData);
            } else {
                res = await teacherService.createTeacher(formData);
            }

            if (res.success) {
                navigate('/teachers');
            } else {
                setApiError(res.message || 'An error occurred');
            }
        } catch (err) {
            setApiError(err.response?.data?.message || 'Server error occurred');
            if (err.response?.data?.data) {
                setErrors(err.response.data.data);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}
            </h1>

            {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label>
                        <input
                            type="text"
                            name="teacherName"
                            value={formData.teacherName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.teacherName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.teacherName && <p className="text-red-500 text-xs mt-1">{errors.teacherName}</p>}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                    <button
                        type="button"
                        onClick={() => navigate('/teachers')}
                        className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-4 py-2 border border-transparent rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Saving...' : 'Save Teacher'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherForm;
