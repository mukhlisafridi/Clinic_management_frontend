
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from '../Components/Navbar'; 

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
        toast.error("Failed to load doctors");
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
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Appointment booking error:", error);
      const errorMessage = error.response?.data?.message || "Failed to book appointment";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar /> 
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 h-screen flex items-center justify-center overflow-hidden pt-16 px-4">
        <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex h-[80vh]">
          
          {/* Left Side - Image */}
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
                <p className="text-blue-50 text-sm mb-4">
                  Book an appointment with our expert doctors
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Multiple Departments</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Quick Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-3/5 p-4 md:p-5 flex flex-col justify-center">
            <div className="mb-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                Book Your <span className="text-blue-600">Appointment</span>
              </h2>
              <p className="text-xs text-gray-600">
                {loadingDoctors ? "Loading..." : `${allDoctors.length} doctors available`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="Last name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Phone * (11)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="11"
                    pattern="\d{11}"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="03001234567"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    NIC * (13)
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="13"
                    pattern="\d{13}"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="4220112345678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    DOB *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    disabled={loading || loadingDoctors}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">{loadingDoctors ? "Loading..." : "Select"}</option>
                    {availableDepartments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Select Doctor *
                  </label>
                  <select
                    onChange={handleDoctorSelect}
                    value={formData.doctor_firstName && formData.doctor_lastName 
                      ? allDoctors.find(d => d.firstName === formData.doctor_firstName && d.lastName === formData.doctor_lastName)?._id || ""
                      : ""}
                    required
                    disabled={loading || loadingDoctors || !formData.department}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">
                      {!formData.department ? "Select department first" : filteredDoctors.length === 0 ? "No doctors" : "Choose"}
                    </option>
                    {filteredDoctors.map(doctor => (
                      <option key={doctor._id} value={doctor._id}>
                        Dr. {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                  </select>
                  {formData.doctor_firstName && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Dr. {formData.doctor_firstName} {formData.doctor_lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Visited Before? *
                  </label>
                  <select
                    name="hasVisited"
                    value={formData.hasVisited}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-900 mb-0.5">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white disabled:bg-gray-100"
                    placeholder="Enter your address"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loading || loadingDoctors}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">Booking...</span>
                  </>
                ) : (
                  <span className="text-sm">Book Appointment</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default AppointmentForm;