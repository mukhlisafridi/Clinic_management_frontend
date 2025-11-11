export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getTokenFromCookies = () => {
  const adminToken = getCookie('adminToken');
  const doctorToken = getCookie('doctorToken');
  const patientToken = getCookie('patientToken');
  
  return adminToken || doctorToken || patientToken || null;
};

export const clearAuthCookies = () => {
  deleteCookie('adminToken');
  deleteCookie('doctorToken');
  deleteCookie('patientToken');
};