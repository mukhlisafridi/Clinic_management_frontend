import React, { useState, useEffect } from "react";
import {
  Plus,
  Check,
  X,
  Clock,
  User,
  Calendar,
  Mail,
  Lock,
  Stethoscope,
  MessageSquare,
  Users,
  Phone,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("appointments");
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const doctorsResponse = await axios.get("/user/doctors");
      if (doctorsResponse.data.success) {
        const doctorsData = doctorsResponse.data.doctors.map((doc) => ({
          id: doc._id,
          name: `${doc.firstName} ${doc.lastName}`,
          email: doc.email,
          department: doc.doctorDepartment,
        }));
        setDoctors(doctorsData);
      }

      await fetchAppointments();
      await fetchMessages();
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      const response = await axios.get("/appointment/getall");

      if (response.data.success) {
        const appointmentsData = response.data.appointments.map((apt) => ({
          id: apt._id,
          patientName: `${apt.firstName} ${apt.lastName}`,
          patientEmail: apt.email,
          patientPhone: apt.phone,
          doctorName: `${apt.doctor.firstName} ${apt.doctor.lastName}`,
          doctorId: apt.doctorId,
          date: new Date(apt.appointment_date).toLocaleDateString(),
          department: apt.department,
          status: apt.status || "Pending",
          visited: apt.hasVisited || false,
        }));
        setAppointments(appointmentsData);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoadingAppointments(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await axios.get("/message/getall");

      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await axios.delete(`/message/delete/${messageId}`);

        if (response.data.success) {
          setMessages(messages.filter((m) => m._id !== messageId));
          toast.success("Message deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      }
    }
  };

  //  Delete doctor
  const deleteDoctor = async (doctorId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this doctor? This action cannot be undone."
      )
    ) {
      try {
        const response = await axios.delete(`/user/doctor/delete/${doctorId}`);

        if (response.data.success) {
          setDoctors(doctors.filter((d) => d.id !== doctorId));
          toast.success("Doctor deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        toast.error("Failed to delete doctor");
      }
    }
  };

  // Update appointment - auto-delete if rejected
  const updateAppointmentStatus = async (id, status) => {
    if (status === "Rejected") {
      if (
        !window.confirm(
          "Rejecting will permanently delete this appointment. Continue?"
        )
      ) {
        return;
      }
    }

    try {
      const response = await axios.put(`/appointment/update/${id}`, { status });

      if (response.data.success) {
        if (response.data.deleted) {
          const updated = appointments.filter((apt) => apt.id !== id);
          setAppointments(updated);
          toast.success("Appointment rejected and deleted!");
        } else {
          const updated = appointments.map((apt) =>
            apt.id === id ? { ...apt, status } : apt
          );
          setAppointments(updated);
          toast.success(`Appointment ${status}!`);
        }
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    if (
      newDoctor.name &&
      newDoctor.email &&
      newDoctor.password &&
      newDoctor.department
    ) {
      try {
        const response = await axios.post("/user/doctor/addnew/simple", {
          name: newDoctor.name,
          email: newDoctor.email,
          password: newDoctor.password,
          department: newDoctor.department,
        });

        if (response.data.success) {
          const newDoctorData = {
            id: response.data.doctor.id,
            name: response.data.doctor.name,
            email: response.data.doctor.email,
            department: response.data.doctor.department,
          };

          const updated = [...doctors, newDoctorData];
          setDoctors(updated);

          setNewDoctor({ name: "", email: "", password: "", department: "" });
          setShowAddDoctor(false);

          toast.success(response.data.message || "Doctor added successfully!");
        }
      } catch (error) {
        console.error("Error adding doctor:", error);
        toast.error(error.response?.data?.message || "Failed to add doctor!");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  const addAdmin = (e) => {
    e.preventDefault();
    if (newAdmin.name && newAdmin.email && newAdmin.password) {
      toast.success(`Admin Created Successfully! Name: ${newAdmin.name}`);
      setNewAdmin({ name: "", email: "", password: "" });
      setShowAddAdmin(false);
    } else {
      toast.error("Please fill all fields");
    }
  };

  const getTotalAppointments = () => appointments.length;
  const getPendingCount = () =>
    appointments.filter((a) => a.status === "Pending").length;
  const getAcceptedCount = () =>
    appointments.filter((a) => a.status === "Accepted").length;

  const handleLogout = async () => {
    try {
      await axios.get("/user/admin/logout");
      logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-7 h-7 md:w-8 md:h-8" />
                Admin Dashboard
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Welcome, {user?.firstName}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-3 pb-2">
        <button
          onClick={() => setShowAddAdmin(true)}
          className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" /> Create Admin
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-4">
        {/* Create Admin Modal */}
        {showAddAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Admin
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" /> Name
                  </label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Total Appointments</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getTotalAppointments()}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-blue-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {getPendingCount()}
                </p>
              </div>
              <Clock className="w-10 h-10 text-yellow-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Accepted</p>
                <p className="text-2xl font-bold text-green-600">
                  {getAcceptedCount()}
                </p>
              </div>
              <Check className="w-10 h-10 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Total Doctors</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {doctors.length}
                </p>
              </div>
              <Users className="w-10 h-10 text-cyan-300" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Messages</p>
                <p className="text-2xl font-bold text-purple-600">
                  {messages.length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-300" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center font-medium transition text-xs sm:text-sm md:text-base whitespace-nowrap ${
                activeTab === "appointments"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`flex-1 px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center font-medium transition text-xs sm:text-sm md:text-base whitespace-nowrap ${
                activeTab === "doctors"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center font-medium transition relative text-xs sm:text-sm md:text-base whitespace-nowrap ${
                activeTab === "messages"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Messages
              {messages.length > 0 && (
                <span className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  All Appointments
                </h2>
                <button
                  onClick={fetchAppointments}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>

              {loadingAppointments ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No appointments yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5 hover:shadow-md transition bg-white"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              apt.visited ? "bg-green-100" : "bg-yellow-100"
                            }`}
                          >
                            {apt.visited ? (
                              <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                              {apt.patientName}
                            </h3>
                            <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                              <p className="flex items-center gap-1 sm:gap-2">
                                <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">
                                  Doctor: {apt.doctorName}
                                </span>
                              </p>
                              <p className="flex items-center gap-1 sm:gap-2">
                                <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />{" "}
                                {apt.department}
                              </p>
                              <p className="flex items-center gap-1 sm:gap-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />{" "}
                                {apt.date}
                              </p>
                              <p className="flex items-center gap-1 sm:gap-2">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {apt.patientEmail}
                                </span>
                              </p>
                              <p className="flex items-center gap-1 sm:gap-2">
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />{" "}
                                {apt.patientPhone}
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm mt-2">
                              <span
                                className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                                  apt.status === "Accepted"
                                    ? "bg-green-100 text-green-800"
                                    : apt.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {apt.status}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                          {apt.status !== "Accepted" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt.id, "Accepted")
                              }
                              className="flex-1 sm:flex-none bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" /> Accept
                            </button>
                          )}
                          {apt.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt.id, "Rejected")
                              }
                              className="flex-1 sm:flex-none bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                            >
                              <X className="w-3 h-3 sm:w-4 sm:h-4" /> Reject
                            </button>
                          )}
                          {apt.status !== "Pending" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt.id, "Pending")
                              }
                              className="flex-1 sm:flex-none bg-yellow-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-yellow-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                            >
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                              Pending
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Doctors Tab */}
          {activeTab === "doctors" && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Doctors Gallery
                </h2>
                <button
                  onClick={() => setShowAddDoctor(true)}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-xs sm:text-sm md:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add Doctor
                </button>
              </div>

              {showAddDoctor && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Register New Doctor
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" /> Name
                      </label>
                      <input
                        type="text"
                        value={newDoctor.name}
                        onChange={(e) =>
                          setNewDoctor({ ...newDoctor, name: e.target.value })
                        }
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
                        onChange={(e) =>
                          setNewDoctor({ ...newDoctor, email: e.target.value })
                        }
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
                        onChange={(e) =>
                          setNewDoctor({
                            ...newDoctor,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Stethoscope className="w-4 h-4 inline mr-1" />{" "}
                        Department
                      </label>
                      <select
                        value={newDoctor.department}
                        onChange={(e) =>
                          setNewDoctor({
                            ...newDoctor,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black appearance-none cursor-pointer"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1.25em 1.25em",
                        }}
                      >
                        <option value="">Select Department</option>
                        <option value="ENT">ENT</option>
                        <option value="Gynecology">Gynecology</option>
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
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition relative"
                  >
                    <button
                      onClick={() => deleteDoctor(doctor.id)}
                      className="absolute top-4 right-4 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition"
                      title="Delete Doctor"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-blue-600">
                          {doctor.department}
                        </p>
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
          {activeTab === "messages" && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Contact Messages
                </h2>
                <button
                  onClick={fetchMessages}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>

              {loadingMessages ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 flex-shrink-0">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-800">
                              {msg.firstName} {msg.lastName}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {new Date(
                                  msg.createdAt || Date.now()
                                ).toLocaleDateString()}
                              </span>
                              
                              <button
                                onClick={() => deleteMessage(msg._id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded-full transition"
                                title="Delete Message"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />{" "}
                              <span className="truncate">{msg.email}</span>
                            </p>
                            <p className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" /> {msg.phone}
                            </p>
                          </div>
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">{msg.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}