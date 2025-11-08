
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PatientRegisterForm from "./pages/RegisterForm"
import AppointmentForm from "./pages/Appoinment"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <>
   <BrowserRouter>
   
   <Routes>
  <Route  path="/" element={  <Home/> } />
  <Route  path="/register" element={  <PatientRegisterForm/> } />
  <Route  path="/apoinment" element={  <AppointmentForm/> } />
   <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
   </BrowserRouter>
     
      
    </>
  )
}

export default App
