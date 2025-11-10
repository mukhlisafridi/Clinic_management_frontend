import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [allDoctors, setAllDoctors] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    doctor_lastName: "",
    hasVisited: "",
    address: ""
  });

  // ✅ Load doctors from database
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await api.get('/user/doctors');
        
        if (response.data.success) {
          const doctors = response.data.doctors;
          setAllDoctors(doctors);
          
          const departments = [...new Set(doctors.map(doc => doc.doctorDepartment))];
          setAvailableDepartments(departments);
        }
      } catch (error) {
        console.error("Error loading doctors:", error);
        toast.error("Failed to load doctors. Please refresh the page.");
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "department") {
      const filtered = allDoctors.filter(doc => doc.doctorDepartment === value);
      setFilteredDoctors(filtered);
      
      setFormData(prev => ({
        ...prev,
        department: value,
        doctor_firstName: "",
        doctor_lastName: ""
      }));
    }
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = allDoctors.find(doc => doc._id === selectedDoctorId);
    
    if (selectedDoctor) {
      setFormData({
        ...formData,
        doctor_firstName: selectedDoctor.firstName,
        doctor_lastName: selectedDoctor.lastName
      });
    } else {
      setFormData({
        ...formData,
        doctor_firstName: "",
        doctor_lastName: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        ...formData,
        hasVisited: formData.hasVisited === "yes" ? true : false,
      };

      const response = await api.post('/appointment/post', appointmentData);

      if (response.data.success) {
        toast.success(response.data.message || "Appointment booked successfully!");
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          nic: "",
          dob: "",
          gender: "",
          appointment_date: "",
          department: "",
          doctor_firstName: "",
          doctor_lastName: "",
          hasVisited: "",
          address: ""
        });
        setFilteredDoctors([]);
        
        // ✅ Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Appointment booking error:", error);
      const errorMessage = error.response?.data?.message || "Failed to book appointment. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex max-h-[95vh]">
        
        {/* Left Side */}
        <div className="hidden lg:block lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-black/10"></div>
          <img
            src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=900&fit=crop"
            alt="Medical Appointment"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                Schedule Your Visit
              </h3>
              <p className="text-blue-50 text-xs mb-4">
                Book an appointment with our expert doctors
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Expert Specialist Doctors</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Multiple Departments</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Quick Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-3/5 p-4 md:p-5 overflow-y-auto">
          <div className="mb-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-0.5">
              Book Your <span className="text-blue-600">Appointment</span>
            </h2>
            <p className="text-xs text-gray-600">
              {loadingDoctors ? "Loading available doctors..." : `${allDoctors.length} doctors available`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="Last name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Phone Number * (11 digits)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  maxLength="11"
                  pattern="\d{11}"
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="03001234567"
                />
              </div>

              {/* NIC */}
              <div>
                <label htmlFor="nic" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  NIC Number * (13 digits)
                </label>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  maxLength="13"
                  pattern="\d{13}"
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="4220112345678"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em 1em" }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Appointment Date */}
              <div>
                <label htmlFor="appointment_date" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                />
              </div>

              {/* ✅ Department - Dynamic from Database */}
              <div>
                <label htmlFor="department" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  disabled={loading || loadingDoctors}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em 1em" }}
                >
                  <option value="">
                    {loadingDoctors ? "Loading departments..." : "Select department"}
                  </option>
                  {availableDepartments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* ✅ Doctor Dropdown - Filtered from Database */}
              <div className="sm:col-span-2">
                <label htmlFor="doctorSelect" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Select Doctor *
                </label>
                <select
                  id="doctorSelect"
                  onChange={handleDoctorSelect}
                  value={formData.doctor_firstName && formData.doctor_lastName 
                    ? allDoctors.find(d => d.firstName === formData.doctor_firstName && d.lastName === formData.doctor_lastName)?._id || ""
                    : ""}
                  required
                  disabled={loading || loadingDoctors || !formData.department}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em 1em" }}
                >
                  <option value="">
                    {!formData.department 
                      ? "Select department first" 
                      : filteredDoctors.length === 0 
                        ? "No doctors available in this department" 
                        : "Choose a doctor"}
                  </option>
                  {filteredDoctors.map(doctor => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.firstName} {doctor.lastName} ({doctor.doctorDepartment})
                    </option>
                  ))}
                </select>
                {formData.doctor_firstName && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selected: Dr. {formData.doctor_firstName} {formData.doctor_lastName}
                  </p>
                )}
              </div>

              {/* Has Visited */}
              <div>
                <label htmlFor="hasVisited" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Visited Before? *
                </label>
                <select
                  id="hasVisited"
                  name="hasVisited"
                  value={formData.hasVisited}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em 1em" }}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-xs font-semibold text-gray-900 mb-0.5">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  placeholder="Enter your complete address"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button
                type="submit"
                disabled={loading || loadingDoctors}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition hover:scale-[1.02] duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">Booking...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AppointmentForm;