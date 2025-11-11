
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import basURL from '../utils/axios';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    today: 0,
    total: 0,
    pending: 0
  });

  useEffect(() => {
    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await basURL.get('/appointment/doctor/my-appointments');
      
      const doctorAppointments = response.data.appointments || [];
      
      setAppointments(doctorAppointments);
      
      const today = new Date().toDateString();
      const todayCount = doctorAppointments.filter(
        apt => new Date(apt.appointment_date).toDateString() === today
      ).length;
      
      const pendingCount = doctorAppointments.filter(
        apt => apt.status === 'Pending'
      ).length;
      
      setStats({
        today: todayCount,
        total: doctorAppointments.length,
        pending: pendingCount
      });
      
    } catch (error) {
      toast.error('Failed to fetch appointments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await basURL.get('/user/doctor/logout');
      logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - RESPONSIVE */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Doctor Dashboard
          </h1>
          
          {/* Doctor Info + Logout - Always horizontal */}
          <div className="flex justify-between items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600 truncate">
              Dr. {user?.firstName} {user?.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 sm:px-4 md:px-5 py-2 rounded hover:bg-red-700 transition text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">
            Welcome, Dr. {user?.firstName}!
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Department: {user?.doctorDepartment || 'General'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
          <div className="bg-blue-50 rounded-lg shadow p-4 md:p-6">
            <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-blue-900 mb-2">
              Today's Appointments
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">{stats.today}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4 md:p-6">
            <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-green-900 mb-2">
              Total Patients
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{stats.total}</p>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-4 md:p-6">
            <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-purple-900 mb-2">
              Pending Reviews
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">{stats.pending}</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              My Appointments
            </h2>
            <button
              onClick={fetchAppointments}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition text-xs sm:text-sm flex items-center gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm sm:text-base text-gray-600 mt-4">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm sm:text-base md:text-lg text-gray-500">No appointments found</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">You currently have no patient appointments</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50 transition">
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {appointment.firstName} {appointment.lastName}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-xs">
                            {appointment.email}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {appointment.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;