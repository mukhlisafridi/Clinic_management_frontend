import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import basURL from '../utils/axios';
import Navbar from '../Components/Navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await basURL.post('/message/send', formData);
      
      toast.success(response.data.message || 'Message sent successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="h-screen  bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 overflow-hidden">
        <Navbar/>
        <Toaster position="top-right" reverseOrder={false} />
        
        {/* Two Column Layout */}
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex h-[85vh]">
          
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Contact Us
              </h1>
              <p className="text-sm text-gray-600">
                Send us a message
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
            
              <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active,
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus,
                textarea:-webkit-autofill:active {
                  -webkit-box-shadow: 0 0 0 1000px white inset !important;
                  -webkit-text-fill-color: #374151 !important;
                  background-color: white !important;
                  transition: background-color 5000s ease-in-out 0s;
                }
              `}</style>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="off"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white disabled:bg-gray-50 text-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="off"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white disabled:bg-gray-50 text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white disabled:bg-gray-50 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="off"
                  minLength="11"
                  maxLength="11"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white disabled:bg-gray-50 text-sm"
                  placeholder="03001234567"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="off"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none text-gray-700 bg-white disabled:bg-gray-50 text-sm"
                  placeholder="Write your message..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Right Side - Hospital Image */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="absolute inset-0 bg-black/10"></div>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=1000&fit=crop"
              alt="Hospital Building"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">
                We're Here to Help
              </h3>
              <p className="text-blue-100 text-sm">
                Your questions and feedback matter to us. Reach out anytime!
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactUs;