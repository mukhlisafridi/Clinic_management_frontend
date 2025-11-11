// Helper function to get cookie by name
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

// Helper function to delete cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// ✅ Get token from cookies (check all three tokens)
export const getTokenFromCookies = () => {
  const adminToken = getCookie('adminToken');
  const doctorToken = getCookie('doctorToken');  // ✅ Doctor token
  const patientToken = getCookie('patientToken');
  
  return adminToken || doctorToken || patientToken || null;
};

// ✅ Delete all auth cookies
export const clearAuthCookies = () => {
  deleteCookie('adminToken');
  deleteCookie('doctorToken');  // ✅ Doctor token
  deleteCookie('patientToken');
};