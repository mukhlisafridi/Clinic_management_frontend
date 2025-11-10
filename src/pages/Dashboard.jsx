import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Clock, User, Calendar, Mail, Lock, Stethoscope, MessageSquare, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../utils/axios'; // ✅ Import axios

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('appointments');
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  // ✅ UPDATED: Load doctors from database
  const loadData = async () => {
    try {
      // ✅ Load doctors from backend API
      const doctorsResponse = await axios.get('/user/doctors');
      if (doctorsResponse.data.success) {
        const doctorsData = doctorsResponse.data.doctors.map(doc => ({
          id: doc._id,
          name: `${doc.firstName} ${doc.lastName}`,
          email: doc.email,
          department: doc.doctorDepartment
        }));
        setDoctors(doctorsData);
      }

      // Load appointments and messages from localStorage
      const appointmentsData = localStorage.getItem('appointments');
      const messagesData = localStorage.getItem('messages');
      
      if (appointmentsData) setAppointments(JSON.parse(appointmentsData));
      if (messagesData) setMessages(JSON.parse(messagesData));

      // Sample data if not exists
      if (!appointmentsData) {
        const sampleAppointments = [
          { id: 1, patientName: 'Ali Hassan', doctorId: 1, date: '2025-11-10', status: 'pending', visited: false },
          { id: 2, patientName: 'Sara Ahmed', doctorId: 2, date: '2025-11-09', status: 'accepted', visited: true }
        ];
        setAppointments(sampleAppointments);
        localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
      }

      if (!messagesData) {
        const sampleMessages = [
          { id: 1, from: 'Ali Hassan', message: 'I need to reschedule my appointment', read: false },
          { id: 2, from: 'Sara Ahmed', message: 'Thank you for the treatment', read: false }
        ];
        setMessages(sampleMessages);
        localStorage.setItem('messages', JSON.stringify(sampleMessages));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load doctors from database');
    }
  };

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // ✅ UPDATED: Add doctor to database
  const addDoctor = async (e) => {
    e.preventDefault();
    
    if (newDoctor.name && newDoctor.email && newDoctor.password && newDoctor.department) {
      try {
        // ✅ Call backend API
        const response = await axios.post('/user/doctor/addnew/simple', {
          name: newDoctor.name,
          email: newDoctor.email,
          password: newDoctor.password,
          department: newDoctor.department
        });

        if (response.data.success) {
          // ✅ Add doctor to state
          const newDoctorData = {
            id: response.data.doctor.id,
            name: response.data.doctor.name,
            email: response.data.doctor.email,
            department: response.data.doctor.department
          };
          
          const updated = [...doctors, newDoctorData];
          setDoctors(updated);
          
          setNewDoctor({ name: '', email: '', password: '', department: '' });
          setShowAddDoctor(false);
          
          toast.success(response.data.message || 'Doctor added successfully!');
        }
      } catch (error) {
        console.error("Error adding doctor:", error);
        
        if (error.response) {
          toast.error(error.response.data.message || 'Failed to add doctor!');
        } else if (error.request) {
          toast.error("Server not responding. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  const addAdmin = (e) => {
    e.preventDefault();
    if (newAdmin.name && newAdmin.email && newAdmin.password) {
      toast.success(`Admin Created Successfully! Name: ${newAdmin.name}`);
      setNewAdmin({ name: '', email: '', password: '' });
      setShowAddAdmin(false);
    } else {
      toast.error('Please fill all fields');
    }
  };

  const updateAppointmentStatus = (id, status) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    saveData('appointments', updated);
    toast.success(`Appointment ${status}!`);
  };

  const markMessageRead = (id) => {
    const updated = messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updated);
    saveData('messages', updated);
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const getTotalAppointments = () => appointments.length;
  const getPendingCount = () => appointments.filter(a => a.status === 'pending').length;
  const getAcceptedCount = () => appointments.filter(a => a.status === 'accepted').length;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-8 h-8" />
                Admin Dashboard
              </h1>
              <p className="text-blue-100 text-sm mt-1">Welcome, {user?.firstName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 font-medium"
            >
              <X className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Create Admin Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <button
          onClick={() => setShowAddAdmin(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" /> Create Admin
        </button>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        {/* Create Admin Modal */}
        {showAddAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Admin</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" /> Name
                  </label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                    placeholder="Admin Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                    placeholder="admin@hospital.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-1" /> Password
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                    placeholder="Password"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={addAdmin}
                    className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Create Admin
                  </button>
                  <button
                    onClick={() => setShowAddAdmin(false)}
                    className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold text-blue-600">{getTotalAppointments()}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{getPendingCount()}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Accepted</p>
                <p className="text-3xl font-bold text-green-600">{getAcceptedCount()}</p>
              </div>
              <Check className="w-12 h-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-300" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 px-6 py-4 text-center font-medium transition ${
                activeTab === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 px-6 py-4 text-center font-medium transition ${
                activeTab === 'doctors'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Doctors Gallery
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 px-6 py-4 text-center font-medium transition relative ${
                activeTab === 'messages'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Messages
              {messages.filter(m => !m.read).length > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          </div>

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">All Appointments</h2>
              <div className="space-y-4">
                {appointments.map(apt => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          apt.visited ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {apt.visited ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <X className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{apt.patientName}</p>
                          <p className="text-sm text-gray-600">Doctor: {getDoctorName(apt.doctorId)}</p>
                          <p className="text-sm text-gray-500">Date: {apt.date}</p>
                          <p className="text-sm mt-1">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              apt.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {apt.status.toUpperCase()}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {apt.status !== 'accepted' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'accepted')}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-1"
                          >
                            <Check className="w-4 h-4" /> Accept
                          </button>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-1"
                          >
                            <X className="w-4 h-4" /> Cancel
                          </button>
                        )}
                        {apt.status !== 'pending' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'pending')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center gap-1"
                          >
                            <Clock className="w-4 h-4" /> Pending
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Doctors Gallery</h2>
                <button
                  onClick={() => setShowAddDoctor(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Doctor
                </button>
              </div>

              {showAddDoctor && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Register New Doctor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" /> Name
                      </label>
                      <input
                        type="text"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                        placeholder="Dr. Ahmed Khan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" /> Email
                      </label>
                      <input
                        type="email"
                        value={newDoctor.email}
                        onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                        placeholder="doctor@hospital.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-1" /> Password
                      </label>
                      <input
                        type="password"
                        value={newDoctor.password}
                        onChange={(e) => setNewDoctor({...newDoctor, password: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                        placeholder="Password"
                      />
                    </div>
                    {/* ✅ Department Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Stethoscope className="w-4 h-4 inline mr-1" /> Department *
                      </label>
                      <select
                        value={newDoctor.department}
                        onChange={(e) => setNewDoctor({...newDoctor, department: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black appearance-none cursor-pointer"
                        style={{ 
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", 
                          backgroundRepeat: "no-repeat", 
                          backgroundPosition: "right 0.75rem center", 
                          backgroundSize: "1.25em 1.25em" 
                        }}
                      >
                        <option value="">Select Department</option>
                        <option value="ENT">ENT (Ear, Nose & Throat)</option>
                        <option value="Gynecology">Gynecology (Women's Health)</option>
                        <option value="Emergency Care">Emergency Care</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <button
                        onClick={addDoctor}
                        className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Register Doctor
                      </button>
                      <button
                        onClick={() => setShowAddDoctor(false)}
                        className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                  <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                        <p className="text-sm text-blue-600">{doctor.department}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {doctor.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Messages</h2>
              <div className="space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`border rounded-lg p-4 hover:shadow-md transition cursor-pointer ${
                      msg.read ? 'border-gray-200 bg-white' : 'border-blue-300 bg-blue-50'
                    }`}
                    onClick={() => markMessageRead(msg.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        msg.read ? 'bg-gray-200' : 'bg-blue-200'
                      }`}>
                        <MessageSquare className={`w-6 h-6 ${msg.read ? 'text-gray-600' : 'text-blue-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-800">{msg.from}</p>
                          {!msg.read && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
                          )}
                        </div>
                        <p className="text-gray-600">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
