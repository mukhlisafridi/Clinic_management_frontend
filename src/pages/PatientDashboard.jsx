import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, User as UserIcon, Stethoscope, Phone, Mail, MapPin, X } from 'lucide-react';
import basURL from '../utils/axios';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  });

  useEffect(() => {
    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await basURL.get('/appointment/patient/my-appointments');
      
      const patientAppointments = response.data.appointments || [];
      
      setAppointments(patientAppointments);
      
      // Calculate stats
      const pendingCount = patientAppointments.filter(apt => apt.status === 'Pending').length;
      const acceptedCount = patientAppointments.filter(apt => apt.status === 'Accepted').length;
      const rejectedCount = patientAppointments.filter(apt => apt.status === 'Rejected').length;
      
      setStats({
        total: patientAppointments.length,
        pending: pendingCount,
        accepted: acceptedCount,
        rejected: rejectedCount
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
      await basURL.get('/user/patient/logout');
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'Accepted':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>;
      case 'Rejected':
        return <X className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                My Appointments
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Welcome, {user?.firstName} {user?.lastName}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 sm:px-4 md:px-5 py-2 rounded-lg hover:bg-red-700 transition text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-500">
            <p className="text-xs text-gray-600 mb-1">Total</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-yellow-500">
            <p className="text-xs text-gray-600 mb-1">Pending</p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-green-500">
            <p className="text-xs text-gray-600 mb-1">Accepted</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.accepted}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-red-500">
            <p className="text-xs text-gray-600 mb-1">Rejected</p>
            <p className="text-2xl md:text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Your Appointment History
            </h2>
            <button
              onClick={fetchAppointments}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm flex items-center gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No appointments yet</p>
              <p className="text-gray-400 text-sm mb-6">Book your first appointment to get started</p>
              <button
                onClick={() => navigate('/appointment')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
              >
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-md transition bg-white"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                            {appointment.department}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Stethoscope className="w-4 h-4" />
                            <span>Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="text-xs font-semibold">{appointment.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{appointment.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{appointment.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;